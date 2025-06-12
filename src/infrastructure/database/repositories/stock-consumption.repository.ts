import { Injectable } from "@nestjs/common";
import { StockEntryConsumptionEntity } from "src/domain/entities";
import { BaseRepository } from "../base";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class StockEntryConsumptionRepository extends BaseRepository<StockEntryConsumptionEntity> {
  constructor(
    @InjectRepository(StockEntryConsumptionEntity) private _repository: Repository<StockEntryConsumptionEntity>,
  ) {
    super(_repository);
  }

    async GetAllConsumptionByStockId(id: string): Promise<StockEntryConsumptionEntity[]> {
    return await this._repository
    .createQueryBuilder('stockEntryConsumption')
    .leftJoinAndSelect('stockEntryConsumption.manipulationOrder', 'manipulation')
    .leftJoinAndSelect('stockEntryConsumption.createdBy', 'creator')
    .select([
        'stockEntryConsumption.id',
        'stockEntryConsumption.quantity_consumed',
        'stockEntryConsumption.created_at',
        'stockEntryConsumption.stock_entry_id',
        'stockEntryConsumption.archived',
        'stockEntryConsumption.price',
        'manipulation.id',
        'manipulation.code',
        'creator.id',
        'creator.name',
        'creator.last_name',
    ])
    .where('stockEntryConsumption.stock_entry_id = :id', { id: id })
    .andWhere('stockEntryConsumption.archived = false')
    .orderBy('stockEntryConsumption.created_at', 'ASC')
    .getMany()
  }
}