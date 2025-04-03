import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserEntity } from 'src/domain/entities';
import { CreateUserUsecase } from 'src/application/usecases';


@Controller('user')
export class UserController {
  constructor(
        private readonly createUserUsecase: CreateUserUsecase,
  ) {}

  @Post()
  create(@Body() data: Partial<UserEntity>) {
    return this.createUserUsecase.process(data);
  }

  // @Get()
  // getAll() {
  //   return this.usecase.getAll();
  // }

  // @Get(':id')
  // findById(@Param('id') id: UUID) {
  //   return this.usecase.getById(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: UUID, @Body() updateUser: Partial<UserEntity>) {
  //   return this.usecase.update(id, updateUser);
  // }

  // @Delete(':id')
  // delete(@Param('id') id: UUID) {
  //   return this.usecase.delete(id);
  // }
}
