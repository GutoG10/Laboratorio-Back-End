import { Injectable } from '@nestjs/common';
import { RawMaterialEntity } from 'src/domain/entities';
import { RawMaterialRepository } from 'src/infrastructure/database/repositories';

@Injectable()
export class SelectRawMaterialUsecase {
  constructor(private readonly petRepository: RawMaterialRepository) {}

  async process(): Promise<Partial<RawMaterialEntity[]>> {
    return await this.petRepository.getAllForSelect();
  }
}
