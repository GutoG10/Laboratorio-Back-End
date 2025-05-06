import { Injectable } from '@nestjs/common';
import { ClientEntity } from 'src/domain/entities';
import { ClientRepository } from 'src/infrastructure/database/repositories';

@Injectable()
export class GetAllClientUsecase {
  constructor(private readonly _clientRepository: ClientRepository) {}

  async process(): Promise<ClientEntity[]> {
    return await this._clientRepository.getAll();
  }
}
