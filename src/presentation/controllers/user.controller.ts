import { Controller, Get, Post, Body, Patch, Param, Put } from '@nestjs/common';
import { UserEntity } from 'src/domain/entities';
import { CreateUserUsecase, GetUserByEmailUsecase, SelectUserUsecase, UpdateUserUsecase } from 'src/application/usecases';
import { AuthUserDto, PasswordDTO } from 'src/application/dto';
import { GetUser } from 'src/common/user';
import { UpdateResult } from 'typeorm';
import { UpdatePasswordUsecase } from 'src/application/usecases/update-password.usecase';

@Controller('user')
export class UserController {

  constructor(
    private readonly createUserUsecase: CreateUserUsecase,
    private readonly selectUserUsecase: SelectUserUsecase,
    private readonly updateUserUsecase: UpdateUserUsecase,
    private readonly getUserByEmailUsecase: GetUserByEmailUsecase,
    private readonly updatePasswordUsecase: UpdatePasswordUsecase,
  ) { }

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

  @Put(':id/password')
  updatePassword(
    @Param('id') id: string,
    @Body() data: PasswordDTO,
    @GetUser() user: AuthUserDto
  ): Promise<UpdateResult>{
    return this.updatePasswordUsecase.process(id, data, user);
  }
}
