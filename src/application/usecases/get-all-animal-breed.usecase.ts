import { Injectable } from '@nestjs/common';
import { AnimalBreedRepository } from 'src/infrastructure/database/repositories';

@Injectable()
export class GetAllAnimalBreedUsecase {
  constructor(private readonly repository: AnimalBreedRepository) {}

  async process() {
    return this.repository.findWithRelations();
  }
}
