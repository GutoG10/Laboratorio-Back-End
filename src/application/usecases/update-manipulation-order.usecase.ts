import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { ManipulationOrderRepository, StockEntryConsumptionRepository, StockEntryRepository } from "src/infrastructure/database/repositories";
import { AuthUserDto, ManipulationOrderDTO } from "../dto";
import { StockEntryEntity } from "src/domain/entities";
import { UpdateResult } from "typeorm";

@Injectable()
export class UpdateManipulationOrderUsecase {
    constructor(
        private readonly _manipulationOrderRepository: ManipulationOrderRepository,
        private readonly _stockEntryConsumptionRepository: StockEntryConsumptionRepository,
        private readonly _stockEntryRepository: StockEntryRepository,
    ) { }

    async process(id: string, data: ManipulationOrderDTO, user: AuthUserDto): Promise<UpdateResult> {
        const stockEntries = await this.validateStockEntries(data, id);

        for (const stock of stockEntries) {
            await this._stockEntryRepository.update(stock.id, { remaining_quantity: stock.remaining_quantity });
        }

        await this._stockEntryConsumptionRepository.deleteAllByManipulationId(id);

        for (const consumption of data.stock_entry_consumption) {
            const stockEntry = await this._stockEntryRepository.getOneById(consumption.stock_entry_id);
            if (stockEntry) {
                Logger.log("Log 1", stockEntry.id, Number(stockEntry.remaining_quantity), Number(consumption.quantity))
                await this._stockEntryRepository.update(stockEntry.id, {
                    remaining_quantity: Number(stockEntry.remaining_quantity) - Number(consumption.quantity)
                });

                await this._stockEntryConsumptionRepository.create({
                    manipulation_order_id: id,
                    type: consumption.type,
                    quantity_consumed: Number(consumption.quantity),
                    stock_entry_id: consumption.stock_entry_id,
                    price: Number(stockEntry.unit_price * consumption.quantity),
                    created_by: user.id,
                    edited_by: user.id,
                    edited_at: new Date()
                });
            } else {
                throw new HttpException(`Stock entry ${consumption.stock_entry_id} não encontrado`, HttpStatus.NOT_FOUND);
            }
        }

        return await this._manipulationOrderRepository.update(id, {
            pet_id: data.pet_id,
            medic_id: data.medic_id,
            type: data.type,
            expiration_date: data.expiration_date,
            total_quantity: Number(data.total_quantity),
            edited_at: new Date(),
            edited_by: user.id,
        });
    }

    async validateStockEntries(data: ManipulationOrderDTO, id: string): Promise<StockEntryEntity[]> {
        let stockEntriesArray: StockEntryEntity[] = [];

        const consumptions = await this._stockEntryConsumptionRepository.getAllConsumptionByManipulationId(id);


        for (const consumption of consumptions) {
            const stockEntry = await this._stockEntryRepository.getOneById(consumption.stock_entry_id);
            stockEntry!.remaining_quantity = Number(stockEntry!.remaining_quantity);

            Logger.log(stockEntry, 'Stock Entry')
            if (stockEntry) {
                stockEntry.remaining_quantity += Number(consumption.quantity_consumed);
                stockEntriesArray.push(stockEntry);
            } else {
                throw new HttpException({
                    status: HttpStatus.NOT_FOUND,
                    error: 'Esse stock entry não existe ou não foi encontrado',
                }, HttpStatus.NOT_FOUND);
            }
        }

        for (const consumption of data.stock_entry_consumption) {
            let stockEntry = stockEntriesArray.find(
                entry => entry.id === consumption.stock_entry_id
            );
            if (!stockEntry) {
                const newStockEntry = await this._stockEntryRepository.getOneById(consumption.stock_entry_id);
                if(!newStockEntry) {
                    throw new HttpException({
                        status: HttpStatus.NOT_FOUND,
                        error: `Esse stock entry não existe ou não foi encontrado`,
                    }, HttpStatus.NOT_FOUND);
                }
                stockEntriesArray.push(newStockEntry);
                stockEntry = newStockEntry;
            }

            if (stockEntry.remaining_quantity < consumption.quantity) {
                throw new HttpException({
                    status: HttpStatus.BAD_REQUEST,
                    error: `Estoque do id ${stockEntry.id} insuficiente`,
                }, HttpStatus.BAD_REQUEST);
            }

        }


        return stockEntriesArray;
    }
}
