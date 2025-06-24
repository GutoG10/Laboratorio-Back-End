import { Injectable } from "@nestjs/common";
import { ManipulationOrderRepository, StockEntryConsumptionRepository } from "src/infrastructure/database/repositories";
import { GetByIdManipulationOrderDTO } from "../dto";

@Injectable()
export class GetManipulationOrderByIdUsecase {
    constructor(
        private readonly _repository: ManipulationOrderRepository,
        private readonly _stockEntryConsumptionRepository: StockEntryConsumptionRepository,
    ) { }

    private response: GetByIdManipulationOrderDTO;

    async process(id: string) {
        const manipulationOrder = await this._repository.getByIdWithRelations(id);

        if (!manipulationOrder) {
            return null;
        }

        const stockEntryConsumptions = await this._stockEntryConsumptionRepository.GetAllConsumptionByManipulationId(id)

        this.response = {
            id: manipulationOrder.id,
            code: manipulationOrder.code,
            expiration_date: manipulationOrder.expiration_date,
            total_quantity: Number(manipulationOrder.total_quantity),
            type: manipulationOrder.type,
            pet: manipulationOrder.pet,
            medic: manipulationOrder.medic,
            createdAt: manipulationOrder.created_at,
            createdBy: manipulationOrder.createdBy,
            edited_at: manipulationOrder.edited_at,
            editedBy: manipulationOrder.editedBy,
            archived_at: manipulationOrder.archived_at,
            archivedBy: manipulationOrder.archivedBy,
            archived: manipulationOrder.archived,
            stockEntryConsumptions: stockEntryConsumptions.map(consumption => ({
                id: consumption.id,
                quantity_consumed: Number(consumption.quantity_consumed),
                price: Number(consumption.price),
                type: consumption.type,
                stockEntry: {
                    id: consumption.stockEntry.id,
                    batch_code: consumption.stockEntry.batch_code,
                    expiration_date: consumption.stockEntry.expiration_date,
                    quantity: Number(consumption.stockEntry.quantity),
                    remaining_quantity: Number(consumption.stockEntry.remaining_quantity),
                    unit_price: Number(consumption.stockEntry.unit_price),
                    supplier: {
                        id: consumption.stockEntry.supplier.id,
                        name: consumption.stockEntry.supplier.name
                    },
                    rawMaterial: {
                        id: consumption.stockEntry.rawMaterial.id,
                        code: consumption.stockEntry.rawMaterial.code,
                        name: consumption.stockEntry.rawMaterial.name,
                        unit: consumption.stockEntry.rawMaterial.unit
                    }
                }
            }))
        }
        return this.response;
    }
}
