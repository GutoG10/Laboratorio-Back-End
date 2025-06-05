import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RawMaterialEntity } from "src/domain/entities";
import { Repository } from "typeorm";
import { BaseRepository } from "../base";

@Injectable()
export class RawMaterialRepository extends BaseRepository<RawMaterialEntity> {
  constructor(
    @InjectRepository(RawMaterialEntity) private _repository: Repository<RawMaterialEntity>,
  ) {
    super(_repository);
  }

  async getAllForSelect(): Promise<Partial<RawMaterialEntity[]>> {
    return this._repository
      .createQueryBuilder('rawMaterial')
      .select(['rawMaterial.id', 'rawMaterial.name'])
      .where('rawMaterial.archived = false')
      .orderBy('rawMaterial.name', 'ASC')
      .getMany();
  }

  async getByName(name: string): Promise<RawMaterialEntity | null> {
    return this._repository.findOne({
      where: { name }
    })
  }

  async findWithRelations(): Promise<RawMaterialEntity[]>{
    return this._repository
    .createQueryBuilder('rawMaterial')
    .leftJoinAndSelect('rawMaterial.archivedBy', 'archived')
    .leftJoinAndSelect('rawMaterial.createdBy', 'creator')
    .leftJoinAndSelect('rawMaterial.editedBy', 'editor')
    .select([
      'rawMaterial.id',
      'rawMaterial.code',
      'rawMaterial.name',
      'rawMaterial.type',
      'rawMaterial.unit',
      'rawMaterial.is_refrigerated',
      'rawMaterial.therapeutic_class',
      'rawMaterial.notes',
      'rawMaterial.created_at',
      'creator.id',
      'creator.name',
      'creator.last_name',
      'rawMaterial.edited_at',
      'editor.id',
      'editor.name',
      'editor.last_name',
      'rawMaterial.archived_at',
      'archived.id',
      'archived.name',
      'archived.last_name',
      'rawMaterial.archived',
    ])
    .orderBy('rawMaterial.code', 'ASC')
    .getMany();
  }
    
}