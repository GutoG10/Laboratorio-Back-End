import { Injectable } from "@nestjs/common";
import { AnimalBreedEntity } from "src/domain/entities";
import { AnimalBreedRepository } from "src/infrastructure/database/repositories";

@Injectable()
export class GetListingAnimalBreedUsecase {
    constructor(
        private readonly repository: AnimalBreedRepository,
    ) {}

    async process(): Promise<AnimalBreedEntity[]> {
        return this.repository.getListing();
    }
}