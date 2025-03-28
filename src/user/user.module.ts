import { Module } from '@nestjs/common';
import { UserRepository } from 'src/user/repository';
import { UserController } from 'src/user/controllers';

@Module({
  controllers: [UserController],
  providers: [UserRepository],
})
export class UserModule {}
