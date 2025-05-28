import { Injectable } from '@nestjs/common';
import { ClientEntity } from 'src/domain/entities';
import { ClientRepository } from 'src/infrastructure/database/repositories';

@Injectable()
export class GetClientByIdUsecase {
  constructor(private readonly clientRepository: ClientRepository) {}

  async process(clientId: string): Promise<ClientEntity | null> {
    return await this.clientRepository.getById(clientId);
  }
}
