import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/infrastructure/database/base';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicEntity } from 'src/domain/entities/medic.entity';

@Injectable()
export class MedicRepository extends BaseRepository<MedicEntity> {
  constructor(
    @InjectRepository(MedicEntity) private _repository: Repository<MedicEntity>,
  ) {
    super(_repository);
  }

  async findWithRelations(): Promise<MedicEntity[]> {
    return this._repository
      .createQueryBuilder('medic')
      .leftJoinAndSelect('medic.createdBy', 'creator')
      .leftJoinAndSelect('medic.editedBy', 'editor')
      .leftJoinAndSelect('medic.archivedBy', 'archiver')
      .select([
        'medic.id',
        'medic.name',
        'medic.last_name',
        'medic.email',
        'medic.created_at',
        'medic.edited_at',
        'medic.archived_at',
        'medic.archived',
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
      .orderBy('medic.name', 'ASC')
      .getMany();
  }

  async getAllForSelect(): Promise<Partial<MedicEntity[]>> {
    return this._repository
      .createQueryBuilder('medic')
      .select(['medic.id', 'medic.name', 'medic.last_name'])
      .where('medic.archived = false')
      .getMany();
  }
}
