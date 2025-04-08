import { Injectable } from "@nestjs/common";
import { ClientEntity } from "src/domain/entities";
import { ClientRepository } from "src/infrastructure/database/repositories";

@Injectable()
export class CreateClientUsecase {
    constructor(private readonly clientRepository: ClientRepository) {}

    process(client: Partial<ClientEntity>): Promise<ClientEntity> {
        return this.clientRepository.create(client);
    }
}