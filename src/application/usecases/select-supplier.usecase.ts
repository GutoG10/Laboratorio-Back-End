import { Injectable } from '@nestjs/common';
import { SupplierEntity } from 'src/domain/entities';
import { SupplierRepository } from 'src/infrastructure/database/repositories';

@Injectable()
export class SelectSupplierUsecase {
  constructor(private readonly clientRepository: SupplierRepository) {}

  async process(): Promise<Partial<SupplierEntity[]>> {
    return await this.clientRepository.getAllForSelect();
  }
}