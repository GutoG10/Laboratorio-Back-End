import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StockEntryEntity } from "src/domain/entities";
import { Repository } from "typeorm";
import { BaseRepository } from "../base";

@Injectable()
export class StockEntryRepository extends BaseRepository<StockEntryEntity> {
  constructor(
    @InjectRepository(StockEntryEntity) private _repository: Repository<StockEntryEntity>,
  ) {
    super(_repository);
  }


  async findWithRelations(): Promise<StockEntryEntity[]>{
    return this._repository
    .createQueryBuilder('stockEntry')
    .leftJoinAndSelect('stockEntry.rawMaterial', 'rawMaterial')
    .leftJoinAndSelect('stockEntry.supplier', 'supplier')
    .leftJoinAndSelect('stockEntry.archivedBy', 'archived')
    .leftJoinAndSelect('stockEntry.createdBy', 'creator')
    .leftJoinAndSelect('stockEntry.editedBy', 'editor')
    .select([
      'stockEntry.id',
      'stockEntry.quantity',
      'stockEntry.unit_price',
      'stockEntry.batch_code',
      'stockEntry.expiration_date',
      'rawMaterial.code',
      'rawMaterial.name',
      'rawMaterial.type',
      'rawMaterial.unit',
      'rawMaterial.crmv',
      'rawMaterial.is_refrigerated',
      'rawMaterial.therapeutic_class',
      'rawMaterial.notes',
      'supplier.id',
      'supplier.name',
      'supplier.email',
      'supplier.address',
      'stockEntry.created_at',
      'creator.id',
      'creator.name',
      'creator.last_name',
      'stockEntry.edited_at',
      'editor.id',
      'editor.name',
      'editor.last_name',
      'stockEntry.archived_at',
      'archived.id',
      'archived.name',
      'archived.last_name',
      'stockEntry.archived',
    ])
    .getMany();
  }
    
}