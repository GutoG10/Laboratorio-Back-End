import { Injectable } from "@nestjs/common";
import { AnimalSpecieEntity } from "src/domain/entities/animal-specie.entity";
import { AnimalSpecieRepository } from "src/infrastructure/database/repositories/animal-specie.repository";

@Injectable()
export class CreateAnimalSpecieUsecase {
    constructor(private readonly repository: AnimalSpecieRepository){}

    async process(data: Partial<AnimalSpecieEntity>): Promise<AnimalSpecieEntity>{
        return this.repository.create(data)
    }
}