import { Injectable } from '@nestjs/common';
import { SupplierEntity } from 'src/domain/entities';
import { SupplierRepository } from 'src/infrastructure/database/repositories';

@Injectable()
export class GetSupplierByIdUsecase {
  constructor(private readonly clientRepository: SupplierRepository) {}

  async process(clientId: string): Promise<SupplierEntity | null> {
    return await this.clientRepository.getById(clientId);
  }
}
