import { Body, Controller, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { AuthUserDto } from "src/application/dto";
import { ArchiveUnarchiveRawMaterialUsecase, CheckRawMaterialNameUsecase, CreateRawMaterialUsecase, GetAllRawMaterialUsecase, GetRawMaterialByIdUsecase, GetStockEntryByMaterialIdUsecase, SelectRawMaterialUsecase, UpdateRawMaterialUsecase } from "src/application/usecases";
import { GetUser } from "src/common/user";
import { PetEntity } from "src/domain/entities";
import { UpdateResult } from "typeorm";

@Controller('raw-material')
export class RawMaterialController {
    constructor(
        private readonly getAllRawMaterialUsecase: GetAllRawMaterialUsecase,
        private readonly getRawMaterialByIdUsecase: GetRawMaterialByIdUsecase,
        private readonly selectRawMaterialUsecase: SelectRawMaterialUsecase,
        private readonly createRawMaterialUsecase: CreateRawMaterialUsecase,
        private readonly archiveUnarchiveRawMaterialUsecase: ArchiveUnarchiveRawMaterialUsecase,
        private readonly updateRawMaterialUsecase: UpdateRawMaterialUsecase,
        private readonly checkRawMaterialNameUsecase: CheckRawMaterialNameUsecase,
        private readonly getStockEntryByMaterialIdUsecase: GetStockEntryByMaterialIdUsecase,
    ) {}

  @Get()
  getAll() {
    return this.getAllRawMaterialUsecase.process();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.getRawMaterialByIdUsecase.process(id);
  }

  @Get('select')
  getAllForSelect() {
    return this.selectRawMaterialUsecase.process();
  }

  @Get('name/check/:name')
  async getByName(@Param('name') name: string) {
    return await this.checkRawMaterialNameUsecase.process(name);
  }

  @Get(':id/stock-entry')
  async getStockEntryByMaterialId(
    @Param('id') id: string
  ) {
    return await this.getStockEntryByMaterialIdUsecase.process(id)
  }

  @Post()
  create(@GetUser() user: AuthUserDto, @Body() data: Partial<PetEntity>) {
    data.created_by = user.id;
    return this.createRawMaterialUsecase.process(data);
  }

  @Patch()
  archiveUnarchive(
    @GetUser() user: AuthUserDto, 
    @Body() data: { id: string, archived: boolean }
  ): Promise<UpdateResult>{
    return this.archiveUnarchiveRawMaterialUsecase.process(data, user);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<PetEntity>,
    @GetUser() user: AuthUserDto,
  ): Promise<UpdateResult> {
    return this.updateRawMaterialUsecase.process(id, data, user);
  }
}