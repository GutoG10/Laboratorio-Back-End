import { GetMedicByIdUsecase } from './../../application/usecases/get-medic-by-id.usecase';
import { GetUser } from 'src/common/user';
import { AuthUserDto } from 'src/application/dto';
import { CreateMedicUsecase } from './../../application/usecases/create-medic.usecase';
import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import {
  ArchiveUnarchiveMedicUsecase,
  GetAllMedicUsecase,
  SelectMedicUsecase,
  UpdateMedicUsecase,
} from 'src/application/usecases';
import { MedicEntity } from 'src/domain/entities/medic.entity';
import { UpdateResult } from 'typeorm';

@Controller('medic')
export class MedicController {
  constructor(
    private readonly getAllMedicUsecase: GetAllMedicUsecase,
    private readonly updateMedicUsecase: UpdateMedicUsecase,
    private readonly selectMedicUsecase: SelectMedicUsecase,
    private readonly archiveUnarchiveMedicUsecase: ArchiveUnarchiveMedicUsecase,
    private readonly createMedicUsecase: CreateMedicUsecase,
    private readonly getMedicByIdUsecase: GetMedicByIdUsecase,
  ) {}

  @Get()
  getAll() {
    return this.getAllMedicUsecase.process();
  }

  @Get('select')
  getAllForSelect() {
    return this.selectMedicUsecase.process();
  }

  @Patch()
  archiveUnarchive(
    @GetUser() user: AuthUserDto, 
    @Body() data: { id: string, archived: boolean }
  ): Promise<UpdateResult>{
    return this.archiveUnarchiveMedicUsecase.process(data, user);
  }

  @Get(':id')
  getById(@Param('id') Medicid: string) {
    return this.getMedicByIdUsecase.process(Medicid);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<MedicEntity>,
    @GetUser() user: AuthUserDto,
  ): Promise<UpdateResult> {
    return this.updateMedicUsecase.process(id, data, user);
  }

  @Post()
  create(@GetUser() user: AuthUserDto, @Body() data: Partial<MedicEntity>) {
    data.created_by = user.id;
    return this.createMedicUsecase.process(data);
  }
}
