import { Module } from "@nestjs/common";
import { UserRepository } from "./database/repositories/user.repository";
import { UserEntity } from "../domain/entities";
import { BaseRepository } from "src/infrastructure/database/base/base.repository";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: 
    [
        UserRepository,
        {
            provide: BaseRepository<UserEntity>,
            useClass: UserRepository,
        }
    ],
    exports: [UserRepository]
})
export class InfraModule {}