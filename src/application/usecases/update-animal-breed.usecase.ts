import { AnimalBreedEntity } from "src/domain/entities";
import { AnimalBreedRepository } from "src/infrastructure/database/repositories";
import { UpdateResult } from "typeorm";
import { AuthUserDto } from "../dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UpdateAnimalBreedUsecase {
    constructor(private readonly _repository: AnimalBreedRepository) {}

    async process(id: string, data: Partial<AnimalBreedEntity>, user: AuthUserDto): Promise<UpdateResult>{
        data.edited_by = user.id
        data.edited_at = new Date()
        return this._repository.update(id, data)
    }
}