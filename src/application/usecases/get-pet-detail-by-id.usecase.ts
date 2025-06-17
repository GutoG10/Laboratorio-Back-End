import { Injectable } from "@nestjs/common";
import { PetEntity } from "src/domain/entities";
import { PetRepository } from "src/infrastructure/database/repositories";

@Injectable()
export class GetPetDetailByIdUsecase {
    constructor(private readonly _repository: PetRepository) {}

    async process(id: string): Promise<PetEntity | null> {
        return this._repository.findDetailById(id)
    }
}