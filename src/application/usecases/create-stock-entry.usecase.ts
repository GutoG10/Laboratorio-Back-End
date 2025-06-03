import { Injectable } from "@nestjs/common";
import { StockEntryEntity } from "src/domain/entities";
import { StockEntryRepository } from "src/infrastructure/database/repositories";

@Injectable()
export class CreateStockEntryUsecase {
  constructor(private readonly repository: StockEntryRepository) {}

  process(data: Partial<StockEntryEntity>): Promise<StockEntryEntity> {
    return this.repository.create(data);
  }
}
