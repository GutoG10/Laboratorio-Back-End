import { Injectable } from '@nestjs/common';
import { MedicEntity } from 'src/domain/entities/medic.entity';
import { MedicRepository } from 'src/infrastructure/database/repositories/medic.repository';

@Injectable()
export class GetMedicByIdUsecase {
  constructor(private readonly clientRepository: MedicRepository) {}

  async process(clientId: string): Promise<MedicEntity | null> {
    return await this.clientRepository.getById(clientId);
  }
}
