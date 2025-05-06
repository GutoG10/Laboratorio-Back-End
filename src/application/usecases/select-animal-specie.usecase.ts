import { Injectable } from '@nestjs/common';
import { AnimalSpecieEntity } from 'src/domain/entities';
import { AnimalSpecieRepository } from 'src/infrastructure/database/repositories';

@Injectable()
export class SelectAnimalSpecieUsecase {
  constructor(
    private readonly animalSpecieRepository: AnimalSpecieRepository,
  ) {}

  async process(): Promise<Partial<AnimalSpecieEntity[]>> {
    return await this.animalSpecieRepository.getAllForSelect();
  }
}
