import { UpdateResult } from "typeorm";
import { AuthUserDto } from "../dto";
import { Injectable } from "@nestjs/common";
import { SupplierEntity } from 'src/domain/entities';
import { SupplierRepository } from 'src/infrastructure/database/repositories';

@Injectable()
export class UpdateSupplierUsecase {
    constructor(private readonly _repository: SupplierRepository) {}

    async process(id: string, data: Partial<SupplierEntity>, user: AuthUserDto): Promise<UpdateResult>{
        data.edited_by = user.id
        data.edited_at = new Date()
        return this._repository.update(id, data)
    }
}