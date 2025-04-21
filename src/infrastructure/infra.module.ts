import { Module } from "@nestjs/common";
import { ClientEntity, UserEntity, AnimalBreedEntity, AnimalSpecieEntity } from "src/domain/entities";
import { BaseRepository } from "src/infrastructure/database/base";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AnimalSpecieRepository, AnimalBreedRepository, ClientRepository, UserRepository } from "./database/repositories/";

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