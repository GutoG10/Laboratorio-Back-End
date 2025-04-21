import { Injectable } from "@nestjs/common";
import { ClientEntity } from "src/domain/entities";
import { ClientRepository } from "src/infrastructure/database/repositories";
import { DeepPartial, UpdateResult } from "typeorm";

@Injectable()
export class EditClientUsecase {
    constructor(private readonly clientRepository: ClientRepository) {}

    async process(id: string, data: DeepPartial<ClientEntity>): Promise<UpdateResult> {
        data.edited_at = new Date();
        return this.clientRepository.update(id, data);
    }
}