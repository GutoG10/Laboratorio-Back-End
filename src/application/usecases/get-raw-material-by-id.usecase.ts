import { Injectable } from "@nestjs/common";
import { RawMaterialEntity } from "src/domain/entities";
import { RawMaterialRepository } from "src/infrastructure/database/repositories";

@Injectable()
export class GetRawMaterialByIdUsecase {
  constructor(
    private readonly petRepository: RawMaterialRepository,
  ) {}

  async process(id: string): Promise<RawMaterialEntity | null> {
    return await this.petRepository.getById(id);
  }
}