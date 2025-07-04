import { Injectable } from '@nestjs/common';
import {
  ManipulationOrderRepository,
  StockEntryConsumptionRepository,
} from 'src/infrastructure/database/repositories';
import { GetAllManipulationOrderDTO } from '../dto/';

@Injectable()
export class GetAllManipulationOrderUsecase {
  constructor(
    private readonly _repository: ManipulationOrderRepository,
    private readonly _stockConsumptionRepository: StockEntryConsumptionRepository,
  ) {}

  async process(): Promise<GetAllManipulationOrderDTO[]> {
    const manipulationOrders = await this._repository.getAllWithRelations();
    
    const response = await Promise.all(
      manipulationOrders.map(async (manipulation) => {
        let totalPrice = 0
        const stockEntryConsumption =
          await this._stockConsumptionRepository.GetPriceByManipulationID(
            manipulation.id,
          );

        for (const consumption of stockEntryConsumption) {
          totalPrice += Number(consumption.price); 
        }

        return {
          id: manipulation.id,
          code: manipulation.code,
          pet: manipulation.pet,
          expiration_date: manipulation.expiration_date,
          medic: manipulation.medic,
          createdAt: manipulation.created_at,
          createdBy: manipulation.createdBy,
          archived: manipulation.archived,
          total_quantity: Number(manipulation.total_quantity),
          total_price: Number(totalPrice),
        };
      }),
    );

    return response;
  }
}
