import { Controller, Get, Param, Post, Body, Patch, Put } from "@nestjs/common";
import { AuthUserDto } from "src/application/dto";
import { GetAllStockEntryUsecase, GetStockEntryByIdUsecase, CreateStockEntryUsecase, ArchiveUnarchiveStockEntryUsecase, UpdateStockEntryUsecase, GetAllConsumptionByStockIdUsecase } from "src/application/usecases";
import { GetUser } from "src/common/user";
import { StockEntryEntity } from "src/domain/entities";
import { UpdateResult } from "typeorm";

@Controller('stock-entry')
export class StockEntryController {
    constructor(
        private readonly getAllStockEntryUsecase: GetAllStockEntryUsecase,
        private readonly getStockEntryByIdUsecase: GetStockEntryByIdUsecase,
        private readonly createStockEntryUsecase: CreateStockEntryUsecase,
        private readonly archiveUnarchiveStockEntryUsecase: ArchiveUnarchiveStockEntryUsecase,
        private readonly updateStockEntryUsecase: UpdateStockEntryUsecase,
        private readonly getAllConsumptionByStockIdUsecase: GetAllConsumptionByStockIdUsecase,
    ) {}

  @Get()
  getAll() {
    return this.getAllStockEntryUsecase.process();
  }

  @Get(':id')
  getById(@Param('id') stockId: string) {
    return this.getStockEntryByIdUsecase.process(stockId);
  }

  @Get(':id/stock-consumption')
  getAllConsumptionByStockId(@Param('id') stockId: string) {
    return this.getAllConsumptionByStockIdUsecase.process(stockId);
  }

  @Post()
  create(@GetUser() user: AuthUserDto, @Body() data: Partial<StockEntryEntity>) {
    data.created_by = user.id;
    data.remaining_quantity = data.quantity;
    return this.createStockEntryUsecase.process(data);
  }

  @Patch()
  archiveUnarchive(
    @GetUser() user: AuthUserDto, 
    @Body() data: { id: string, archived: boolean }
  ): Promise<UpdateResult>{
    return this.archiveUnarchiveStockEntryUsecase.process(data, user);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<StockEntryEntity>,
    @GetUser() user: AuthUserDto,
  ): Promise<UpdateResult> {
    return this.updateStockEntryUsecase.process(id, data, user);
  }
}