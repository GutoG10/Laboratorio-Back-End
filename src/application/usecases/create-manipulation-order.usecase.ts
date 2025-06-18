import { BadRequestException, Injectable } from "@nestjs/common";
import { ManipulationOrderEntity } from "src/domain/entities/manipulation-order.entity";
import { ManipulationOrderRepository, StockEntryConsumptionRepository, StockEntryRepository } from "src/infrastructure/database/repositories";
import { AuthUserDto, ManipulationOrderDTO } from "../dto";

@Injectable()
export class CreateManipulationOrderUsecase {
    constructor(
        private readonly _manipulationOrderRepository: ManipulationOrderRepository,
        private readonly _stockEntryRepository: StockEntryRepository,
        private readonly _stockConsumptionRepository: StockEntryConsumptionRepository,
    ) {}

    async process(data: ManipulationOrderDTO, user: AuthUserDto): Promise<ManipulationOrderEntity>{

        let totalQuantity = 0
        data.stock_entry_consumption.forEach(async consumption => {
            const stockEntries = await this._stockEntryRepository.getById(consumption.stock_entry_id)
            if(stockEntries){
                if(stockEntries?.remaining_quantity < consumption.quantity){
                    throw new BadRequestException(`Estoque do id ${stockEntries.id} insuficiente`)
                }
                totalQuantity++;
            }
        });

        const manipulationOrder = await this._manipulationOrderRepository.create({
                    pet_id: data.pet_id,
                    medic_id: data.medic_id,
                    type: data.type,
                    expiration_date: data.expiration_date,
                    total_quantity: totalQuantity,
                    created_by: user.id
                })

         data.stock_entry_consumption.forEach(async consumption => {
            const stockEntries = await this._stockEntryRepository.getById(consumption.stock_entry_id)
            if(stockEntries){
                await this._stockEntryRepository.update(stockEntries.id, { remaining_quantity: stockEntries.remaining_quantity - consumption.quantity })
                await this._stockConsumptionRepository.create({ 
                    manipulation_order_id: manipulationOrder.id,
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