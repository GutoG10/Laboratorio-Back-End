import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/infrastructure/database/base/';
import { UserEntity } from 'src/domain/entities';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity) private _repository: Repository<UserEntity>,
  ) {
    super(_repository);
  }

  async UserSignIn(data: Partial<UserEntity>): Promise<Partial<UserEntity> | null> {
    if (!data.password) {
      throw new Error('Password is required');
    }
    const encriptedPassword = await bcrypt.hash(data.password, 10);
    data.password = encriptedPassword;
    return this._repository.save(data);
  }

  async getAllForSelect(): Promise<Partial<UserEntity[]>> {
    return this._repository
      .createQueryBuilder('user')
      .select(['user.id', 'user.name'])
      .getMany();
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this._repository.findOneBy({ email });
  }
}
