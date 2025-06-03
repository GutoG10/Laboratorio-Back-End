import { Injectable } from "@nestjs/common"
import { StockEntryEntity } from "src/domain/entities"
import { StockEntryRepository } from "src/infrastructure/database/repositories"
import { AuthUserDto } from "../dto"
import { UpdateResult } from "typeorm"

@Injectable()
export class UpdateStockEntryUsecase {
    constructor(private readonly _repository: StockEntryRepository) {}

    async process(id: string, data: Partial<StockEntryEntity>, user: AuthUserDto): Promise<UpdateResult>{
        data.edited_by = user.id
        data.edited_at = new Date()
        return this._repository.update(id, data)
    }
}