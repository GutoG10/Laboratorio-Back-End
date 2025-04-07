import { Module } from "@nestjs/common";
import { UserRepository } from "./database/repositories/user.repository";
import { UserEntity } from "../domain/entities";
import { BaseRepository } from "src/infrastructure/database/base/base.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AnimalSpecieRepository } from "./database/repositories/animal_specie.repository";
import { AnimalSpecieEntity } from "src/domain/entities/animal-specie.entity";
import { AnimalBreedRepository } from "./database/repositories/animal-breed.repository";
import { AnimalBreedEntity } from "src/domain/entities/animal-breed.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, AnimalSpecieEntity, AnimalBreedEntity])],
    providers: 
    [
        AnimalSpecieRepository,
        {
            provide: BaseRepository<AnimalSpecieEntity>,
            useClass: AnimalSpecieRepository,
        },
        AnimalBreedRepository,
        {
            provide: BaseRepository<AnimalBreedEntity>,
            useClass: AnimalBreedRepository,

        },
        UserRepository,
        {
            provide: BaseRepository<UserEntity>,
            useClass: UserRepository,
        }
    ],
    exports: [UserRepository, AnimalSpecieRepository, AnimalBreedRepository]
})
export class InfraModule {}