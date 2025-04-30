import { Injectable } from "@nestjs/common";
import { PetEntity } from "src/domain/entities/pet.entity";
import { PetRepository } from "src/infrastructure/database/repositories/pet.repository";

@Injectable()
export class SelectPetUsecase {
    constructor(private readonly petRepository: PetRepository) {}
    
    async process(): Promise<Partial<PetEntity[]>> {
        return await this.petRepository.getAllForSelect();
    }
}