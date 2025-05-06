import { Injectable } from '@nestjs/common';
import { PetRepository } from 'src/infrastructure/database/repositories/pet.repository';

@Injectable()
export class GetAllPetUsecase {
  constructor(private readonly repository: PetRepository) {}

  async process() {
    return this.repository.getAll();
  }
}
