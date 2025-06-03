import { AuthUserDto } from "../dto";
import { UpdateResult } from "typeorm";
import { Injectable } from "@nestjs/common";
import { StockEntryRepository } from "src/infrastructure/database/repositories";

@Injectable()
export class ArchiveUnarchiveStockEntryUsecase {
    constructor(
        private readonly repository: StockEntryRepository
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