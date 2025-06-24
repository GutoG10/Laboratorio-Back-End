import { ManipulationOrderTypeEnum, StockEntryConsumptionTypeEnum, UnitEnum } from "src/domain/enum"

export class GetByIdManipulationOrderDTO {
 
    id: string
  code: number
  total_quantity: number
  type: ManipulationOrderTypeEnum
  pet: {
    id: string
    name: string
    client: {
      id: string
      name: string
      last_name: string
    }
  }
  expiration_date: Date
  medic: {
    id: string
    name: string
    last_name: string
  }
  createdAt: Date
  createdBy: {
    id: string
    name: string
    last_name: string
  }
  edited_at: Date
  editedBy: {
    id: string
    name: string
    last_name: string
  }
  archived_at: Date
  archivedBy: {
    id: string
    name: string
    last_name: string
  }
  archived: boolean
  stockEntryConsumptions: {
    id: string
    quantity_consumed: number
    price: number
    type: StockEntryConsumptionTypeEnum
    stockEntry: {
      id: string
      batch_code: string
      expiration_date: Date
      quantity: number
      remaining_quantity: number
      unit_price: number
      supplier: {
        id: string
        name: string
      }
      rawMaterial: {
        id: string
        code: number
        name: string
        unit: UnitEnum
      }
    }
  }[]
}  