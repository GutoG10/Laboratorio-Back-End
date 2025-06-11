import { UpdateResult } from "typeorm";
import { AuthUserDto } from "../dto";
import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/infrastructure/database/repositories";
import { UserEntity } from "src/domain/entities";
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class UpdateUserUsecase {
  constructor(private readonly _repository: UserRepository) {}

  async process(id: string, data: Partial<UserEntity>, user: AuthUserDto): Promise<UpdateResult> {
    if(!user){
        throw new HttpException('Usuário do token não encontrado', HttpStatus.BAD_REQUEST);
    }
    // Só pode editar ele mesmo
    if (id !== user.id) {
      throw new HttpException('Sem permissão para editar outro usuário', HttpStatus.UNAUTHORIZED);
    }

    // Se o email foi alterado, verificar se já existe outro usuário com o mesmo email
    if (data.email) {
      const existingUser = await this._repository.findByEmail(data.email);
      // Se encontrar um usuário com esse email e for diferente do próprio usuário
      if (existingUser && existingUser.id !== id) {
        throw new HttpException('Email existente', HttpStatus.BAD_REQUEST);
      }
    }

    return this._repository.update(id, data);
  }
}
