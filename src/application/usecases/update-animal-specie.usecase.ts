import { AnimalSpecieEntity } from "src/domain/entities";
import { AnimalSpecieRepository } from "src/infrastructure/database/repositories";
import { UpdateResult } from "typeorm";
import { AuthUserDto } from "../dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UpdateAnimalSpecieUsecase {
    constructor(private readonly _repository: AnimalSpecieRepository) {}

    async process(id: string, data: Partial<AnimalSpecieEntity>, user: AuthUserDto): Promise<UpdateResult>{
        data.edited_by = user.id
        data.edited_at = new Date()
        return this._repository.update(id, data)
    }
}