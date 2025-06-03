import { Injectable } from "@nestjs/common";
import { StockEntryEntity } from "src/domain/entities";
import { StockEntryRepository } from "src/infrastructure/database/repositories";

@Injectable()
export class GetStockEntryByIdUsecase {
  constructor(
    private readonly petRepository: StockEntryRepository,
  ) {}

  async process(id: string): Promise<StockEntryEntity | null> {
    return await this.petRepository.getById(id);
  }
}