import { UserEntity } from "src/domain/entities"
import { ManipulationOrderEntity } from "src/domain/entities/manipulation-order.entity"

export class StockEntryDTO {
    stock_entries: {
        id: string,
        quantity_consumed: number,
        created_at: Date,
        manipulationOrder?: Partial<ManipulationOrderEntity>
        createdBy: Partial<UserEntity>
    }[]
    resume: {
        total_quantity_consumed: number,
        total_price: number,
    }
}