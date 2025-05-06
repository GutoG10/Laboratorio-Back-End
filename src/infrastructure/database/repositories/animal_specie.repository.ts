import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../base/base.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnimalSpecieEntity } from 'src/domain/entities/';

@Injectable()
export class AnimalSpecieRepository extends BaseRepository<AnimalSpecieEntity> {
  constructor(
    @InjectRepository(AnimalSpecieEntity)
    private _repository: Repository<AnimalSpecieEntity>,
  ) {
    super(_repository);
  }

  async findAllByName(
    name: string,
    archived: boolean,
  ): Promise<AnimalSpecieEntity[]> {
    return this._repository
      .createQueryBuilder('animal_specie')
      .leftJoinAndSelect('animal_specie.UserCreator', 'creator')
      .leftJoinAndSelect('animal_specie.UserEditor', 'editor')
      .leftJoinAndSelect('animal_specie.UserArchived', 'archived')
      .where('animal_specie.name ILIKE :name', { name: `%${name}%` })
      .andWhere('animal_specie.archived = :archived', { archived })
      .getMany();
  }

  async getAllForSelect(): Promise<Partial<AnimalSpecieEntity[]>> {
    return this._repository
      .createQueryBuilder('animal_specie')
      .select(['animal_specie.id', 'animal_specie.name'])
      .getMany();
  }

  async getAllData(): Promise<AnimalSpecieEntity[]> {
    return this._repository
      .createQueryBuilder('animal_specie')
      .leftJoinAndSelect('animal_specie.UserCreator', 'creator')
      .leftJoinAndSelect('animal_specie.UserEditor', 'editor')
      .leftJoinAndSelect('animal_specie.UserArchived', 'archived')
      .getMany();
  }
}
