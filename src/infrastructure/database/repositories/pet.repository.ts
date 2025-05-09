import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../base/base.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PetEntity } from 'src/domain/entities/pet.entity';

@Injectable()
export class PetRepository extends BaseRepository<PetEntity> {
  constructor(
    @InjectRepository(PetEntity) private _repository: Repository<PetEntity>,
  ) {
    super(_repository);
  }

  async getAllForSelect(): Promise<Partial<PetEntity[]>> {
    return this._repository
      .createQueryBuilder('pet')
      .select(['pet.id', 'pet.name'])
      .getMany();
  }

  async findWithRelations(): Promise<PetEntity[]> {
    return this._repository
      .createQueryBuilder('pet')
      .leftJoinAndSelect('pet.animalBreed', 'breed')
      .leftJoinAndSelect('pet.animalSpecie', 'specie')
      .leftJoinAndSelect('pet.client', 'client')
      .leftJoinAndSelect('pet.createdBy', 'creator')
      .leftJoinAndSelect('pet.editedBy', 'editor')
      .leftJoinAndSelect('pet.archivedBy', 'archiver')
      .select([
        'pet.id',
        'pet.name',
        'pet.created_at',
        'pet.edited_at',
        'pet.archived_at',
        'pet.archived',
        'creator.id',
        'creator.name',
        'creator.last_name',
        'editor.id',
        'editor.name',
        'editor.last_name',
        'archiver.id',
        'archiver.name',
        'archiver.last_name',
        'specie.id',
        'specie.name',
        'breed.id',
        'breed.name',
        'client.id',
        'client.name',
        'client.last_name'


      ])
      .getMany();
  }
}
