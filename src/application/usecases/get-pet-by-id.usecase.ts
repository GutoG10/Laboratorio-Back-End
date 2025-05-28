import { Injectable } from '@nestjs/common';
import { AnimalSpecieEntity, PetEntity } from 'src/domain/entities';
import { PetRepository } from 'src/infrastructure/database/repositories';

@Injectable()
export class GetPetByIdUsecase {
  constructor(
    private readonly petRepository: PetRepository,
  ) {}

  async process(petId: string): Promise<PetEntity | null> {
    return await this.petRepository.getById(petId);
  }
}
