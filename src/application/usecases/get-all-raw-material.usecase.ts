import { Injectable } from '@nestjs/common';
import { RawMaterialEntity } from 'src/domain/entities';
import { RawMaterialRepository } from 'src/infrastructure/database/repositories';

@Injectable()
export class GetAllRawMaterialUsecase {
  constructor(private readonly repository: RawMaterialRepository) {}

  async process(): Promise<RawMaterialEntity[]> {
    return this.repository.findWithRelations();
  }
}
