import { UpdateResult } from "typeorm";
import { AuthUserDto } from "../dto";
import { Injectable } from "@nestjs/common";
import { PetRepository } from "src/infrastructure/database/repositories";
import { PetEntity } from "src/domain/entities";

@Injectable()
export class UpdatePetUsecase {
    constructor(private readonly _repository: PetRepository) {}

    async process(id: string, data: Partial<PetEntity>, user: AuthUserDto): Promise<UpdateResult>{
        data.edited_by = user.id
        data.edited_at = new Date()
        return this._repository.update(id, data)
    }
}