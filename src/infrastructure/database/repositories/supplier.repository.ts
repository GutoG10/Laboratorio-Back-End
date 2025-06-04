import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/infrastructure/database/base';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupplierEntity } from 'src/domain/entities';

@Injectable()
export class SupplierRepository extends BaseRepository<SupplierEntity> {
  constructor(
    @InjectRepository(SupplierEntity)
    private _repository: Repository<SupplierEntity>,
  ) {
    super(_repository);
  }

  async findWithRelations(): Promise<SupplierEntity[]> {
    return this._repository
      .createQueryBuilder('supplier')
      .leftJoinAndSelect('supplier.createdBy', 'creator')
      .leftJoinAndSelect('supplier.editedBy', 'editor')
      .leftJoinAndSelect('supplier.archivedBy', 'archiver')
      .select([
        'supplier.id',
        'supplier.name',
        'supplier.email',
        'supplier.address',
        'supplier.created_at',
        'supplier.edited_at',
        'supplier.archived_at',
        'supplier.archived',
        'creator.id',
        'creator.name',
        'creator.last_name',
        'editor.id',
        'editor.name',
        'editor.last_name',
        'archiver.id',
        'archiver.name',
        'archiver.last_name',
      ])
      .orderBy('supplier.name', 'ASC')
      .getMany();
  }

  async getAllForSelect(): Promise<Partial<SupplierEntity[]>> {
    return this._repository
      .createQueryBuilder('supplier')
      .select(['supplier.id', 'supplier.name', 'supplier.last_name'])
      .where('supplier.archived = false')
      .getMany();
  }
}
