import { Injectable } from '@nestjs/common';
import { MedicEntity } from 'src/domain/entities/medic.entity';
import { MedicRepository } from 'src/infrastructure/database/repositories/medic.repository';

@Injectable()
export class CreateMedicUsecase {
  constructor(private readonly clientRepository: MedicRepository) {}

  process(client: Partial<MedicEntity>): Promise<MedicEntity> {
    return this.clientRepository.create(client);
  }
}
