import { Injectable } from "@nestjs/common";
import { AnimalBreedEntity } from "src/domain/entities/animal-breed.entity";
import { AnimalBreedRepository } from "src/infrastructure/database/repositories/animal-breed.repository";

@Injectable()
export class CreateAnimalBreedUsecase {
  constructor(private readonly repository: AnimalBreedRepository) {}

  async process(data: Partial<AnimalBreedEntity>): Promise<AnimalBreedEntity> {
    return this.repository.create(data);
  }
}