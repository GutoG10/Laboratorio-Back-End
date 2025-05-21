import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { UserEntity } from 'src/domain/entities';
import { CreateUserUsecase, SelectUserUsecase, UpdateUserUsecase } from 'src/application/usecases';
import { AuthUserDto } from 'src/application/dto';
import { GetUser } from 'src/common/user';
import { UpdateResult } from 'typeorm';

@Controller('user')
export class UserController {
  constructor(
    private readonly createUserUsecase: CreateUserUsecase,
    private readonly selectUserUsecase: SelectUserUsecase,
    private readonly updateUserUsecase: UpdateUserUsecase,
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

  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<UserEntity>,
  ): Promise<UpdateResult> {
    return this.updateUserUsecase.process(id, data);
  }
}
