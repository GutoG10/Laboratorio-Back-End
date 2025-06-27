export class GetAllManipulationOrderDTO {

    id: string
    code: number
    pet:{
      id: string
      name:string
      client:{
        id: string
        name:string
        last_name:string
      }
    }
    expiration_date:Date
    medic:{
      id:string
      name:string
      last_name:string
    }
    createdAt: Date
    createdBy:{
      id:string
      name:string
      last_name:string
    }
    archived: boolean
    total_quantity: number
    total_price: number
}