import { ManipulationOrderTypeEnum, StockEntryConsumptionTypeEnum } from "src/domain/enum"

import {
  IsUUID,
  IsEnum,
  IsDateString,
  ValidateNested,
  IsArray,
  IsInt,
  Min
} from 'class-validator';
import { Type } from 'class-transformer';

class StockEntryConsumptionDTO {
  @IsUUID()
  stock_entry_id: string;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsEnum(StockEntryConsumptionTypeEnum)
  type: StockEntryConsumptionTypeEnum
}

export class ManipulationOrderDTO {
  @IsUUID()
  pet_id: string;

  @IsUUID()
  medic_id: string;

  @IsEnum(ManipulationOrderTypeEnum)
  type: ManipulationOrderTypeEnum;

  @IsDateString()
  expiration_date: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StockEntryConsumptionDTO)
  stock_entry_consumption: StockEntryConsumptionDTO[];
}
