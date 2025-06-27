import { HttpException, Injectable } from "@nestjs/common";
import { ManipulationOrderRepository, StockEntryConsumptionRepository, StockEntryRepository } from "src/infrastructure/database/repositories";
import { DeleteResult } from "typeorm";

@Injectable()
export class DeleteManipulationOrderUsecase {
    constructor(
        private readonly _manipulationOrderRepository: ManipulationOrderRepository,
        private readonly _stockEntryConsumptionRepository: StockEntryConsumptionRepository,
        private readonly _stockEntryRepository: StockEntryRepository,
    ) { }

    async process(id: string): Promise<DeleteResult> {
        const consumptions = await this._stockEntryConsumptionRepository.getAllConsumptionByManipulationId(id);

        for (const consumption of consumptions) {
            const stockEntry = await this._stockEntryRepository.getOneById(consumption.stock_entry_id);
            if (stockEntry) {
                await this._stockEntryRepository.update(stockEntry.id, {
                    remaining_quantity: Number(stockEntry.remaining_quantity) + Number(consumption.quantity_consumed)
                })
                await this._stockEntryConsumptionRepository.delete(consumption.id);
            } else {
                throw new HttpException(`Stock entry ${consumption.stock_entry_id} não encontrado`, 404);
            }
        }

        return await this._manipulationOrderRepository.delete(id);
    }
}