import { Injectable } from '@nestjs/common';
import { PetEntity } from 'src/domain/entities';
import { PetRepository } from 'src/infrastructure/database/repositories';

@Injectable()
export class GetAllPetUsecase {
  constructor(private readonly repository: PetRepository) {}

  async process(): Promise<PetEntity[]> {
    return this.repository.findWithRelations();
  }
}
