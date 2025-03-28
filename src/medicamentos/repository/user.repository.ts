import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from 'src/user/dto';

@Injectable()
export class UserRepository {
  
  readonly users: CreateUserDTO[] = []

  create(data: CreateUserDTO) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  // update(id: number, updateMedicamentoDto: UpdateMedicamentoDto) {
  //   return `This action updates a #${id} medicamento`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
