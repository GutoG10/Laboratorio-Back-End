import { Injectable } from '@nestjs/common';
import { SupplierEntity } from 'src/domain/entities';
import { SupplierRepository } from 'src/infrastructure/database/repositories';

@Injectable()
export class GetAllSupplierUsecase {
  constructor(private readonly _SupplierRepository: SupplierRepository) {}

  async process(): Promise<SupplierEntity[]> {
    return await this._SupplierRepository.findWithRelations();
  }
}
