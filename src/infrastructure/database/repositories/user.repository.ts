import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/infrastructure/database/base/';
import { UserEntity } from 'src/domain/entities';
import { Repository, UpdateResult } from 'typeorm';
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

async validatePassword(userId: string, currentPassword: string): Promise<boolean> {
  const user = await this._repository.findOneBy({ id: userId });

  if (!user || !user.password) {
    return false;
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  return isMatch;
}

  async updatePassword(userId: string, newPassword: string): Promise<UpdateResult> {
    return this._repository.update(userId, { password: newPassword })
  }

  async getAllForSelect(): Promise<Partial<UserEntity[]>> {
    return this._repository
      .createQueryBuilder('user')
      .select(['user.id', 'user.name'])
      .where('user.archived = false')
      .getMany();
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this._repository.findOneBy({ email });
  }
}
