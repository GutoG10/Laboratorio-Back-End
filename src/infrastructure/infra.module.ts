import { Module } from "@nestjs/common";
import { UserRepository } from "./database/repositories/user.repository";
import { ClientEntity, UserEntity } from "src/domain/entities";
import { BaseRepository } from "src/infrastructure/database/base/base.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AnimalSpecieRepository } from "./database/repositories/animal_specie.repository";
import { AnimalSpecieEntity } from "src/domain/entities/animal-specie.entity";
import { AnimalBreedRepository } from "./database/repositories/animal-breed.repository";
import { AnimalBreedEntity } from "src/domain/entities/animal-breed.entity";
import { ClientRepository } from "./database/repositories/client.repository";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, AnimalSpecieEntity, ClientEntity, AnimalBreedEntity])],
    providers: 
    [
        ClientRepository,
        {
            provide: BaseRepository<ClientEntity>,
            useClass: ClientRepository,
        },
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
    ],
    exports: [UserRepository, ClientRepository, AnimalSpecieRepository, AnimalBreedRepository]

})
export class InfraModule {}