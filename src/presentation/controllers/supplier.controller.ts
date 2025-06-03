import { GetSupplierByIdUsecase } from './../../application/usecases/get-supplier-by-id.usecase';
import { GetUser } from 'src/common/user';
import { AuthUserDto } from 'src/application/dto';
import { CreateSupplierUsecase } from './../../application/usecases/create-supplier.usecase';
import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import {
  ArchiveUnarchiveSupplierUsecase,
  GetAllSupplierUsecase,
  SelectSupplierUsecase,
  UpdateSupplierUsecase,
} from 'src/application/usecases';
import { SupplierEntity } from 'src/domain/entities/supplier.entity';
import { UpdateResult } from 'typeorm';

@Controller('supplier')
export class SupplierController {
  constructor(
    private readonly getAllSupplierUsecase: GetAllSupplierUsecase,
    private readonly updateSupplierUsecase: UpdateSupplierUsecase,
    private readonly selectSupplierUsecase: SelectSupplierUsecase,
    private readonly archiveUnarchiveSupplierUsecase: ArchiveUnarchiveSupplierUsecase,
    private readonly createSupplierUsecase: CreateSupplierUsecase,
    private readonly getSupplierByIdUsecase: GetSupplierByIdUsecase,
  ) {}

  @Get()
  getAll() {
    return this.getAllSupplierUsecase.process();
  }

  @Get('select')
  getAllForSelect() {
    return this.selectSupplierUsecase.process();
  }

  @Patch()
  archiveUnarchive(
    @GetUser() user: AuthUserDto, 
    @Body() data: { id: string, archived: boolean }
  ): Promise<UpdateResult>{
    return this.archiveUnarchiveSupplierUsecase.process(data, user);
  }

  @Get(':id')
  getById(@Param('id') Supplierid: string) {
    return this.getSupplierByIdUsecase.process(Supplierid);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<SupplierEntity>,
    @GetUser() user: AuthUserDto,
  ): Promise<UpdateResult> {
    return this.updateSupplierUsecase.process(id, data, user);
  }

  @Post()
  create(@GetUser() user: AuthUserDto, @Body() data: Partial<SupplierEntity>) {
    data.created_by = user.id;
    return this.createSupplierUsecase.process(data);
  }
}
