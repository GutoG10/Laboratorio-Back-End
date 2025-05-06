import { Injectable } from '@nestjs/common';
import { AnimalSpecieEntity } from 'src/domain/entities';
import { AnimalSpecieRepository } from 'src/infrastructure/database/repositories';

@Injectable()
export class GetAllAnimalSpecieByNameUsecase {
  constructor(
    private readonly animalSpecieRepository: AnimalSpecieRepository,
  ) {}

  async process(
    name: string,
    archived: boolean,
  ): Promise<AnimalSpecieEntity[]> {
    return await this.animalSpecieRepository.findAllByName(name, archived);
  }
}
