import { UserRepository } from "src/infrastructure/database/repositories";
import { AuthUserDto, PasswordDTO } from "../dto";
import { BadRequestException, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UpdatePasswordUsecase {
    constructor(private readonly _repository: UserRepository) {}

    async process(id: string, data: PasswordDTO, user: AuthUserDto) {

    if(id !== user.id){
        throw new UnauthorizedException('Sem permissão para editar outro usuário')
    }

    if (data.newPassword.includes(' ')) {
        throw new BadRequestException('A senha não pode conter espaços.');
    }

    if(data.newPassword.length < 8) {
        throw new BadRequestException('A senha deve ser ter no mínimo 8 caracteres.');
    }

    const validate = await this._repository.validatePassword(id, data.currentPassword)

    if(!validate){
        throw new UnauthorizedException('Senha atual incorreta')
    }

    const encriptedNewPassword = await bcrypt.hash(data.newPassword, 10);

    return this._repository.updatePassword(id, encriptedNewPassword);

    }
}