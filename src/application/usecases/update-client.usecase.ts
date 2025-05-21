import { ClientEntity } from "src/domain/entities";
import { ClientRepository } from "src/infrastructure/database/repositories";
import { UpdateResult } from "typeorm";
import { AuthUserDto } from "../dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UpdateClientUsecase {
    constructor(private readonly _repository: ClientRepository) {}

    async process(id: string, data: Partial<ClientEntity>, user: AuthUserDto): Promise<UpdateResult>{
        data.edited_by = user.id
        data.edited_at = new Date()
        return this._repository.update(id, data)
    }
}