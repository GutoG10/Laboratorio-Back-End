import { Injectable, NotFoundException } from "@nestjs/common";
import { StockEntryConsumptionEntity } from "src/domain/entities";
import { StockEntryConsumptionRepository, StockEntryRepository } from "src/infrastructure/database/repositories";
import { StockEntryDTO } from "../dto/stock-entries.dto";

@Injectable()
export class GetAllConsumptionByStockIdUsecase {
    constructor(
        private readonly _repository: StockEntryConsumptionRepository,
        private readonly _stockEntryRepository: StockEntryRepository,
    ) { }

    async process(id: string): Promise<StockEntryDTO> {
        const checkStockEntry = await this._stockEntryRepository.getById(id)
        if (!checkStockEntry) {
            throw new NotFoundException({
                statusCode: 404,
                message: 'ID de estoque não encontrado',
                error: 'Not Found',
            });
        }
        const consumptions = await this._repository.GetAllConsumptionByStockId(id)
        let totalPrice: number = 0;
        let totalQuantity: number = 0;
        let response = new StockEntryDTO;
        response.stock_entries = []
        response.resume = {
            total_price: 0,
            total_quantity_consumed: 0,
        }

        if (consumptions && consumptions.length > 0) {
            consumptions.forEach((consumption) => {
                totalPrice += Number(consumption.price);
                totalQuantity += Number(consumption.quantity_consumed);

                response.stock_entries.push({
                    id: consumption.id,
                    quantity_consumed: consumption.quantity_consumed,
                    created_at: consumption.created_at,
                    createdBy: consumption.createdBy,
                    manipulationOrder: consumption.manipulationOrder,
                });
            });
        }

        response.resume = {
            total_price: totalPrice,
            total_quantity_consumed: totalQuantity,
        }

        return response;
    }
}