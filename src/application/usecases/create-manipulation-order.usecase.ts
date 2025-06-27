import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ManipulationOrderEntity } from "src/domain/entities/manipulation-order.entity";
import { ManipulationOrderRepository, StockEntryConsumptionRepository, StockEntryRepository } from "src/infrastructure/database/repositories";
import { AuthUserDto, ManipulationOrderDTO } from "../dto";

@Injectable()
export class CreateManipulationOrderUsecase {
    constructor(
        private readonly _manipulationOrderRepository: ManipulationOrderRepository,
        private readonly _stockEntryRepository: StockEntryRepository,
        private readonly _stockConsumptionRepository: StockEntryConsumptionRepository,
    ) { }

    async process(data: ManipulationOrderDTO, user: AuthUserDto): Promise<ManipulationOrderEntity> {

        data.stock_entry_consumption.forEach(async consumption => {
            const stockEntries = await this._stockEntryRepository.getById(consumption.stock_entry_id)
            if (stockEntries) {
                if (stockEntries?.remaining_quantity < consumption.quantity) {
                    throw new HttpException({
                        status: HttpStatus.BAD_REQUEST,
                        error: `Estoque do id ${stockEntries.id} insuficiente`,
                    }, HttpStatus.BAD_REQUEST);
                }
            }
            if(!stockEntries) {
                throw new HttpException({
                    status: HttpStatus.NOT_FOUND,
                    error: 'Esse stock entry não existe ou não foi encontrado',
                }, HttpStatus.NOT_FOUND);
            }
        });

        const manipulationOrder = await this._manipulationOrderRepository.create({
            pet_id: data.pet_id,
            medic_id: data.medic_id,
            type: data.type,
            expiration_date: data.expiration_date,
            total_quantity: data.total_quantity,
            created_by: user.id
        })

        data.stock_entry_consumption.forEach(async consumption => {
            const stockEntries = await this._stockEntryRepository.getById(consumption.stock_entry_id)
            if (stockEntries) {
                await this._stockEntryRepository.update(stockEntries.id, { remaining_quantity: stockEntries.remaining_quantity - consumption.quantity })
                await this._stockConsumptionRepository.create({
                    manipulation_order_id: manipulationOrder.id,
                    type: consumption.type,
                    quantity_consumed: consumption.quantity,
                    stock_entry_id: consumption.stock_entry_id,
                    price: stockEntries.unit_price * consumption.quantity,
                    created_by: user.id
                })
            }
        });
        return manipulationOrder;
    }
}