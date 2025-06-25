import { Injectable } from "@nestjs/common";
import { StockEntryEntity } from "src/domain/entities";
import { StockEntryRepository } from "src/infrastructure/database/repositories";

@Injectable()
export class CreateStockEntryUsecase {
  constructor(private readonly repository: StockEntryRepository) {}

  process(data: Partial<StockEntryEntity>): Promise<StockEntryEntity> {
    data.remaining_quantity = data.quantity;
    return this.repository.create(data);
  }
}
