import { Injectable } from '@nestjs/common';
import { AnimalSpecieEntity } from 'src/domain/entities/';
import { AnimalSpecieRepository } from 'src/infrastructure/database/repositories/';

@Injectable()
export class CreateAnimalSpecieUsecase {
  constructor(private readonly repository: AnimalSpecieRepository) {}

  async process(
    data: Partial<AnimalSpecieEntity>,
  ): Promise<AnimalSpecieEntity> {
    return this.repository.create(data);
  }
}
