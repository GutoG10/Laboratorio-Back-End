import { Injectable } from "@nestjs/common";
import { ManipulationOrderRepository, StockEntryConsumptionRepository } from "src/infrastructure/database/repositories";
import { GetAllManipulationOrderDTO } from "../dto/";

@Injectable()
export class GetAllManipulationOrderUsecase {
    constructor(
        private readonly _repository: ManipulationOrderRepository,
        private readonly _stockConsumptionRepository: StockEntryConsumptionRepository,
    ) {}

    private response: GetAllManipulationOrderDTO[] = [];

    async process() {
        const manipulationOrders = await this._repository.getAllWithRelations();

        manipulationOrders.forEach(async manipulation => {
            let totalPrice = 0;
            const stockEntryConsumption = await this._stockConsumptionRepository.GetPriceByManipulationID(manipulation.id);
            stockEntryConsumption.forEach(consumption => {
                totalPrice += consumption.price;
            });

            this.response.push({
                    id: manipulation.id,
                    code: manipulation.code,
                    pet: manipulation.pet,
                    expiration_date: manipulation.expiration_date,
                    medic: manipulation.medic,
                    createdAt: manipulation.created_at,
                    createdBy: manipulation.createdBy,
                    archived: manipulation.archived,
                    total_quantity: Number(manipulation.total_quantity),
                    total_price: Number(totalPrice)
            })
        });
        
        return this.response;
    }
}