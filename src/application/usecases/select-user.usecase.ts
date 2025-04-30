import { Injectable } from "@nestjs/common";
import { UserEntity } from "src/domain/entities";
import { UserRepository } from "src/infrastructure/database/repositories";

@Injectable()
export class SelectUserUsecase {
    constructor(private readonly userRepository: UserRepository) {}

    async process(): Promise<Partial<UserEntity[]>> {
        return await this.userRepository.getAllForSelect();
    }
}