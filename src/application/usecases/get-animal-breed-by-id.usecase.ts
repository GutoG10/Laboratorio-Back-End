import { Injectable } from '@nestjs/common';
import { AnimalBreedEntity, AnimalSpecieEntity } from 'src/domain/entities';
import { AnimalBreedRepository } from 'src/infrastructure/database/repositories';

@Injectable()
export class GetAnimalBreedByIdUsecase {
  constructor(
    private readonly animalBreedRepository: AnimalBreedRepository,
  ) {}

  async process(animalBreedId: string): Promise<AnimalBreedEntity | null> {
    return await this.animalBreedRepository.getById(animalBreedId);
  }
}
