import { Module } from '@nestjs/common';
import { UserRepository } from 'src/user/repository';
import { UserController } from 'src/user/controllers';
import { UserEntity } from 'src/entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserRepository],
})
export class UserModule {}
