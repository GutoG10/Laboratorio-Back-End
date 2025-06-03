import { Injectable } from '@nestjs/common';
import { MedicEntity } from 'src/domain/entities/medic.entity';
import { MedicRepository } from 'src/infrastructure/database/repositories/medic.repository';

@Injectable()
export class GetAllMedicUsecase {
  constructor(private readonly _MedicRepository: MedicRepository) {}

  async process(): Promise<MedicEntity[]> {
    return await this._MedicRepository.findWithRelations();
  }
}
