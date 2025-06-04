import { Injectable } from '@nestjs/common';
import { SupplierEntity } from 'src/domain/entities';
import { SupplierRepository } from 'src/infrastructure/database/repositories/supplier.repository';

@Injectable()
export class CreateSupplierUsecase {
  constructor(private readonly clientRepository: SupplierRepository) {}

  process(client: Partial<SupplierEntity>): Promise<SupplierEntity> {
    return this.clientRepository.create(client);
  }
}
