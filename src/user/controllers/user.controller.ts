import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserRepository } from 'src/user/repository';
import { CreateUserDTO } from 'src/user/dto';


@Controller('user')
export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  @Post()
  create(@Body() data: CreateUserDTO) {
    return this.userRepository.create(data);
  }

  @Get()
  findAll() {
    return this.userRepository.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userRepository.findOne(+id);
  }

//  @Patch(':id')
//  update(@Param('id') id: string, @Body() updateMedicamentoDto: UpdateMedicamentoDto) {
//    return this.userRepository.update(+id, updateMedicamentoDto);
//  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userRepository.remove(+id);
  }
}
