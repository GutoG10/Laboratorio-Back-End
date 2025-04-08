import { Injectable } from "@nestjs/common";
import { BaseRepository } from "../base/base.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AnimalBreedEntity } from "src/domain/entities/animal-breed.entity";

@Injectable()
export class AnimalBreedRepository extends BaseRepository<AnimalBreedEntity> {
  constructor(@InjectRepository(AnimalBreedEntity) private _repository: Repository<AnimalBreedEntity>) {
    super(_repository);
  }

  async getAllData(): Promise<AnimalBreedEntity[]> {
    return this._repository
      .createQueryBuilder('animal_breed')
      .leftJoinAndSelect('animal_breed.user_creator', 'creator')
      .leftJoinAndSelect('animal_breed.user_editor', 'editor')
      .leftJoinAndSelect('animal_breed.user_archived', 'archived')
      .getMany();
  }
}
