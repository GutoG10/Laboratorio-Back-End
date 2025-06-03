import { Injectable } from "@nestjs/common";
import { StockEntryEntity } from "src/domain/entities";
import { StockEntryRepository } from "src/infrastructure/database/repositories";

@Injectable()
export class GetAllStockEntryUsecase {
  constructor(private readonly repository: StockEntryRepository) {}

  async process(): Promise<StockEntryEntity[]> {
    return this.repository.findWithRelations();
  }
}
