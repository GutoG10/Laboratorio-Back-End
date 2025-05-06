import { Injectable } from '@nestjs/common';
import { AnimalBreedEntity } from 'src/domain/entities';
import { AnimalBreedRepository } from 'src/infrastructure/database/repositories';

@Injectable()
export class SelectAnimalBreedUsecase {
  constructor(private readonly animalBreedRepository: AnimalBreedRepository) {}

  async process(specie: string): Promise<Partial<AnimalBreedEntity[]>> {
    return await this.animalBreedRepository.getAllForSelect(specie);
  }
}
