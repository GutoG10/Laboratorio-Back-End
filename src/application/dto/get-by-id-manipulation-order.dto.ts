import { ManipulationOrderTypeEnum, StockEntryConsumptionTypeEnum, UnitEnum } from "src/domain/enum"
import { Decimal128 } from "typeorm"

export class GetByIdManipulationOrderDTO {
 
    id: string
  code: number
  total_quantity: number
  type: ManipulationOrderTypeEnum
  pet: {
    id: string
    name: string
    birth_date: Date
    weight: Decimal128
    notes: string
    archived: boolean
    animalBreed: {
      id: string
      name: string
    }
    animalSpecie: {
      id: string
      name: string
    }
    client: {
      id: string
      name: string
      last_name: string
      phone: string
      email: string
      address: string
      notes: string
      archived: boolean
    }
  }
  expiration_date: Date
  medic: {
    id: string
    name: string
    last_name: string
    crmv: string
    notes: string
    email: string
    archived: boolean
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