import { AuthUserDto } from "../dto";
import { UpdateResult } from "typeorm";
import { Injectable } from "@nestjs/common";
import { SupplierRepository } from "src/infrastructure/database/repositories/supplier.repository";

@Injectable()
export class ArchiveUnarchiveSupplierUsecase {
    constructor(
        private readonly repository: SupplierRepository
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