import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../base/base.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnimalBreedEntity } from 'src/domain/entities/';

@Injectable()
export class AnimalBreedRepository extends BaseRepository<AnimalBreedEntity> {
  constructor(
    @InjectRepository(AnimalBreedEntity)
    private _repository: Repository<AnimalBreedEntity>,
  ) {
    super(_repository);
  }

  async getAllData(): Promise<AnimalBreedEntity[]> {
    return this._repository
      .createQueryBuilder('animal_breed')
      .leftJoinAndSelect('animal_breed.createdBy', 'creator')
      .leftJoinAndSelect('animal_breed.editedBy', 'editor')
      .leftJoinAndSelect('animal_breed.archivedBy', 'archived')
      .getMany();
  }
  
  async findWithRelations(): Promise<AnimalBreedEntity[]> {
    return this._repository
      .createQueryBuilder('animal_breed')
      .leftJoinAndSelect('animal_breed.animalSpecie', 'animal_specie')
      .leftJoinAndSelect('animal_breed.createdBy', 'creator')
      .leftJoinAndSelect('animal_breed.editedBy', 'editor')
      .leftJoinAndSelect('animal_breed.archivedBy', 'archived')
      .select([
        'animal_breed.id',
        'animal_breed.name',
        'animal_breed.created_at',
        'animal_breed.edited_at',
        'animal_breed.archived_at',
        'animal_breed.archived',
        'animal_specie.id',
        'animal_specie.name',
        'creator.id',
        'creator.name',
        'creator.last_name',
        'editor.id',
        'editor.name',
        'editor.last_name',
        'archived.id',
        'archived.name',
        'archived.last_name',
      ])
      .orderBy('animal_specie.name', 'ASC')
      .addOrderBy('animal_breed.name', 'ASC')
      .getMany();
  }

  async getAllForSelect(specie: string): Promise<Partial<AnimalBreedEntity[]>> {
    return this._repository
      .createQueryBuilder('animal_breed')
      .select(['animal_breed.id', 'animal_breed.name'])
      .where('animal_breed.animal_specie_id = :specie', { specie })
      .getMany();
  }
}
