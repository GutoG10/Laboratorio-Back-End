import { Injectable } from '@nestjs/common';
import { AnimalSpecieEntity } from 'src/domain/entities';
import { AnimalSpecieRepository } from 'src/infrastructure/database/repositories';

@Injectable()
export class GetAnimalSpecieByIdUsecase {
  constructor(
    private readonly animalSpecieRepository: AnimalSpecieRepository,
  ) {}

  async process(animalSpecieId: string): Promise<AnimalSpecieEntity | null> {
    return await this.animalSpecieRepository.getById(animalSpecieId);
  }
}
