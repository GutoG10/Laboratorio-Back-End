import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities';
import { CreateUserDTO } from 'src/user/dto';
import { Repository } from 'typeorm';


@Injectable()
export class UserRepository {

  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {}

  async create(data: CreateUserDTO) {
    const user = this.userRepository.create(data);
    return await this.userRepository.save(user);
  }

  findAll() {
    const users = this.userRepository.find();
    return users;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  // update(id: number, updateMedicamentoDto: UpdateMedicamentoDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
