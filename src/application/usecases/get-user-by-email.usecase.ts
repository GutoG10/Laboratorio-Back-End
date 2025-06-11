import { Injectable } from "@nestjs/common";
import { UserEntity } from "src/domain/entities";
import { UserRepository } from "src/infrastructure/database/repositories";

@Injectable()
export class GetUserByEmailUsecase {

    constructor(private readonly _repository: UserRepository){}

    process(email: string): Promise<Partial<UserEntity> | null>{
        return this._repository.findByEmail(email);
    }
}