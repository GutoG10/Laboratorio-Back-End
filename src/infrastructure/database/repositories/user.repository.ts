import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/infrastructure/database/base/';
import { UserEntity } from 'src/domain/entities';
import { Repository } from 'typeorm';


@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
  constructor(@InjectRepository(UserEntity) private _repository: Repository<UserEntity>) {
    super(_repository);
  }  
}
