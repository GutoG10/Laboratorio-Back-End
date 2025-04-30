import { Injectable } from "@nestjs/common";
import { PetEntity } from "src/domain/entities/pet.entity";
import { PetRepository } from "src/infrastructure/database/repositories/pet.repository";

@Injectable()
export class CreatePetUsecase {
  constructor(private readonly repository: PetRepository) {}

  async process(data: Partial<PetEntity>): Promise<PetEntity> {
    return this.repository.create(data);
  }
}