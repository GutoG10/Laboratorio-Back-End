import { BadRequestException, Injectable } from "@nestjs/common";
import { RawMaterialEntity } from "src/domain/entities";
import { TypeEnum } from "src/domain/enum";
import { RawMaterialRepository } from "src/infrastructure/database/repositories";

@Injectable()
export class CreateRawMaterialUsecase {
  constructor(private readonly repository: RawMaterialRepository) {}

  process(data: Partial<RawMaterialEntity>): Promise<RawMaterialEntity> {
    if (data.type !== TypeEnum.ACTIVE_PRINCIPLE && data.therapeutic_class !== undefined) {
      throw new BadRequestException("Therapeutic class can only be set for active principles! Please change it to active principles.");
    }
    if (
      data.type !== TypeEnum.ACTIVE_PRINCIPLE &&
      data.type !== TypeEnum.EXCIPIENT &&
      data.type !== TypeEnum.PACKAGING
    ) {
      throw new BadRequestException("Type and unit are required fields! Please provide them in the request.");
    }
    return this.repository.create(data);
  }
}
    
      
