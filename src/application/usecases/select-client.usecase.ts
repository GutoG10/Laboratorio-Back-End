import { Injectable } from '@nestjs/common';
import { ClientEntity } from 'src/domain/entities';
import { ClientRepository } from 'src/infrastructure/database/repositories';

@Injectable()
export class SelectClientUsecase {
  constructor(private readonly clientRepository: ClientRepository) {}

  async process(): Promise<Partial<ClientEntity[]>> {
    return await this.clientRepository.getAllForSelect();
  }
}
