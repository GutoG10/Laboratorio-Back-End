import { Injectable } from "@nestjs/common";
import { AnimalBreedEntity } from "src/domain/entities/";
import { AnimalBreedRepository } from "src/infrastructure/database/repositories/";

@Injectable()
export class CreateAnimalBreedUsecase {
  constructor(private readonly repository: AnimalBreedRepository) {}

  async process(data: Partial<AnimalBreedEntity>): Promise<AnimalBreedEntity> {
    return this.repository.create(data);
  }
}