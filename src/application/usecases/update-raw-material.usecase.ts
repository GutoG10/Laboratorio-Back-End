import { Injectable } from "@nestjs/common"
import { RawMaterialRepository } from "src/infrastructure/database/repositories"
import { AuthUserDto } from "../dto"
import { RawMaterialEntity } from "src/domain/entities"
import { UpdateResult } from "typeorm"

@Injectable()
export class UpdateRawMaterialUsecase {
    constructor(private readonly _repository: RawMaterialRepository) {}

    async process(id: string, data: Partial<RawMaterialEntity>, user: AuthUserDto): Promise<UpdateResult>{
        data.edited_by = user.id
        data.edited_at = new Date()
        return this._repository.update(id, data)
    }
}