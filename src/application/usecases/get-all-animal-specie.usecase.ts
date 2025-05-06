import { Injectable } from '@nestjs/common';
import { AnimalSpecieEntity } from 'src/domain/entities/';
import { AnimalSpecieRepository } from 'src/infrastructure/database/repositories/';

@Injectable()
export class GetAllAnimalSpecieUsecase {
  constructor(private readonly repository: AnimalSpecieRepository) {}

  async process(): Promise<AnimalSpecieEntity[]> {
    return this.repository.getAllData();
  }
}
