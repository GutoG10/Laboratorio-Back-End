import { Module } from "@nestjs/common";
import { UserRepository } from "./database/repositories/user.repository";
import { ClientEntity, UserEntity } from "src/domain/entities";
import { BaseRepository } from "src/infrastructure/database/base/base.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AnimalSpecieRepository } from "./database/repositories/animal-specie.repository";
import { AnimalSpecieEntity } from "src/domain/entities/animal-specie.entity";
import { ClientRepository } from "./database/repositories/client.repository";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, AnimalSpecieEntity, ClientEntity])],
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
        UserRepository,
    ],
    exports: [UserRepository, ClientRepository, AnimalSpecieRepository]
})
export class InfraModule {}