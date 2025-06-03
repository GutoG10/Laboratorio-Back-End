import { Injectable } from '@nestjs/common';
import { MedicEntity } from 'src/domain/entities/medic.entity';
import { MedicRepository } from 'src/infrastructure/database/repositories/medic.repository';

@Injectable()
export class SelectMedicUsecase {
  constructor(private readonly clientRepository: MedicRepository) {}

  async process(): Promise<Partial<MedicEntity[]>> {
    return await this.clientRepository.getAllForSelect();
  }
}