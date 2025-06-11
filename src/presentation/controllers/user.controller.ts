import { Controller, Get, Post, Body, Patch, Param, Put } from '@nestjs/common';
import { UserEntity } from 'src/domain/entities';
import { CreateUserUsecase, GetUserByEmailUsecase, SelectUserUsecase, UpdateUserUsecase } from 'src/application/usecases';
import { AuthUserDto } from 'src/application/dto';
import { GetUser } from 'src/common/user';
import { UpdateResult } from 'typeorm';

@Controller('user')
export class UserController {

  constructor(
    private readonly createUserUsecase: CreateUserUsecase,
    private readonly selectUserUsecase: SelectUserUsecase,
    private readonly updateUserUsecase: UpdateUserUsecase,
    private readonly getUserByEmailUsecase: GetUserByEmailUsecase,
  ) {}

  @Get('select')
  getAllForSelect() {
    return this.selectUserUsecase.process();
  }

  @Post()
  create(
    @Body() data: Partial<UserEntity>
  ) {
    return this.createUserUsecase.process(data);
  }

@Get('email/check/:email')
async checkEmailExists(@Param('email') email: string): Promise<Partial<UserEntity> | null> {
  const user = await this.getUserByEmailUsecase.process(email);
  if (!user) {
    return null;
  }
  const { id, name, email: userEmail } = user;
  return { id, name, email: userEmail };
}

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<UserEntity>,
    @GetUser() user: AuthUserDto,
  ): Promise<UpdateResult> {
    return this.updateUserUsecase.process(id, data, user);
  }
}
