import { UserEntity } from 'src/domain/entities';
import { UserRepository } from 'src/infrastructure/database/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateUserUsecase {
  constructor(private readonly repository: UserRepository) {}

  async process(data: Partial<UserEntity>): Promise<Partial<UserEntity> | null> {
    return await this.repository.UserSignIn(data);
  }
}
