import { Injectable } from "@nestjs/common";
import { RawMaterialEntity } from "src/domain/entities";
import { RawMaterialRepository } from "src/infrastructure/database/repositories";

@Injectable()
export class CreateRawMaterialUsecase {
  constructor(private readonly repository: RawMaterialRepository) {}

  process(data: Partial<RawMaterialEntity>): Promise<RawMaterialEntity> {
    return this.repository.create(data);
  }
}
