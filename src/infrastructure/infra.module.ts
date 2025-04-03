import { Module } from "@nestjs/common";
import { UserRepository } from "./database/repositories/user.repository";
import { UserEntity } from "../domain/entities";
import { BaseRepository } from "src/infrastructure/database/base/base.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AnimalSpecieRepository } from "./database/repositories/animal-specie.repository";
import { AnimalSpecieEntity } from "src/domain/entities/animal-specie.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, AnimalSpecieEntity])],
    providers: 
    [
        AnimalSpecieRepository,
        {
            provide: BaseRepository<AnimalSpecieEntity>,
            useClass: AnimalSpecieRepository,
        },
        UserRepository,
        {
            provide: BaseRepository<UserEntity>,
            useClass: UserRepository,
        }
    ],
    exports: [UserRepository, AnimalSpecieRepository]
})
export class InfraModule {}