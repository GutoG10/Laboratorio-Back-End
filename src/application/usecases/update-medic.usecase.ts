import { UpdateResult } from "typeorm";
import { AuthUserDto } from "../dto";
import { Injectable } from "@nestjs/common";
import { MedicEntity } from "src/domain/entities/medic.entity";
import { MedicRepository } from "src/infrastructure/database/repositories/medic.repository";

@Injectable()
export class UpdateMedicUsecase {
    constructor(private readonly _repository: MedicRepository) {}

    async process(id: string, data: Partial<MedicEntity>, user: AuthUserDto): Promise<UpdateResult>{
        data.edited_by = user.id
        data.edited_at = new Date()
        return this._repository.update(id, data)
    }
}