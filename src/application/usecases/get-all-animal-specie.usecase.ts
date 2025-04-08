import { Injectable } from "@nestjs/common";
import { AnimalSpecieEntity } from "src/domain/entities/animal-specie.entity";
import { AnimalSpecieRepository } from "src/infrastructure/database/repositories/animal_specie.repository";

@Injectable()
export class GetAllAnimalSpecieUsecase {
    constructor(private readonly repository: AnimalSpecieRepository){}

    async process(): Promise<AnimalSpecieEntity[]>{
        return this.repository.getAllData()
    }
}