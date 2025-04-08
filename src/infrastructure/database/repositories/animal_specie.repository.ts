import { Injectable } from "@nestjs/common";
import { BaseRepository } from "../base/base.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AnimalSpecieEntity } from "src/domain/entities/animal-specie.entity";

@Injectable()
export class AnimalSpecieRepository extends BaseRepository<AnimalSpecieEntity> {
    constructor(@InjectRepository(AnimalSpecieEntity) private _repository: Repository<AnimalSpecieEntity>) {
    super(_repository);
  }  

  async getAllData(): Promise<AnimalSpecieEntity[]>{
    return this._repository
    .createQueryBuilder('animal_specie')
    .leftJoinAndSelect('animal_specie.user_creator', 'creator')
    .leftJoinAndSelect('animal_specie.user_editor', 'editor')
    .leftJoinAndSelect('animal_specie.user_archived', 'archived')
    .getMany()
  }
}