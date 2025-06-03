import { AuthUserDto } from "../dto";
import { UpdateResult } from "typeorm";
import { Injectable } from "@nestjs/common";
import { MedicRepository } from "src/infrastructure/database/repositories/medic.repository";

@Injectable()
export class ArchiveUnarchiveMedicUsecase {
    constructor(
        private readonly repository: MedicRepository
    ){}
    async process(data: { id: string, archived: boolean}, user: AuthUserDto): Promise<UpdateResult> {
        const { id, archived } = data;
        if(archived)
        {
            return this.repository.update(id, { archived: archived, archived_by: user.id, archived_at: new Date()})
        }
        else
        {
            return this.repository.update(id, { archived: archived})
        }
    }
}