import { UpdateResult } from "typeorm";
import { AuthUserDto } from "../dto";
import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/infrastructure/database/repositories";
import { UserEntity } from "src/domain/entities";

@Injectable()
export class UpdateUserUsecase {
    constructor(private readonly _repository: UserRepository) {}

    async process(id: string, data: Partial<UserEntity>): Promise<UpdateResult>{
        return this._repository.update(id, data)
    }
}