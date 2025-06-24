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

    async GetPriceByManipulationID(id: string): Promise<StockEntryConsumptionEntity[]> {
      return await this._repository
      .createQueryBuilder('stockEntryConsumption')
      .select([
        'stockEntryConsumption.id',
        'stockEntryConsumption.price',
      ])
      .where('stockEntryConsumption.manipulation_order_id = :id', { id: id })
      .getMany();
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

  async GetAllConsumptionByManipulationId(id: string): Promise<StockEntryConsumptionEntity[]> {
    return await this._repository
    .createQueryBuilder('stockEntryConsumption')
    .leftJoinAndSelect('stockEntryConsumption.stockEntry', 'stockEntry')
    .leftJoinAndSelect('stockEntry.rawMaterial', 'rawMaterial')
    .leftJoinAndSelect('stockEntry.supplier', 'supplier')
    .select([
        'stockEntryConsumption.id',
        'stockEntryConsumption.quantity_consumed',
        'stockEntryConsumption.price',
        'stockEntryConsumption.type',
        'stockEntryConsumption.manipulation_order_id',
        'stockEntry.id',
        'stockEntry.batch_code',
        'stockEntry.expiration_date',
        'stockEntry.quantity',
        'stockEntry.remaining_quantity',
        'stockEntry.unit_price',
        'supplier.id',
        'supplier.name',
        'rawMaterial.id',
        'rawMaterial.code',
        'rawMaterial.name',
        'rawMaterial.unit',
    ])
    .where('stockEntryConsumption.manipulation_order_id = :id', { id: id })
    .andWhere('stockEntryConsumption.archived = false')
    .orderBy('stockEntryConsumption.created_at', 'ASC')
    .getMany()
  }
}