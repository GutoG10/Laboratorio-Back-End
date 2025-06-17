export class StockEntryExpiredDTO {
  valid: {
    id:string
    batch_code: string
    expiration_date: Date
    quantity: number
    remaining_quantity: number
    unit_price: number
    supplier:{
      id: string
      name: string
    }
  }[]
  expired: {
      id:string
      batch_code: string
      expiration_date: Date
      quantity: number
      remaining_quantity: number
      unit_price: number
      supplier:{
        id: string
        name: string
      }
    }[]
}