import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { AuthUserDto } from 'src/application/dto';
import {
  ArchiveUnarchivePetUsecase,
  CreatePetUsecase,
  GetAllPetUsecase,
  SelectPetUsecase,
  UpdatePetUsecase,
} from 'src/application/usecases';
import { GetPetByIdUsecase } from 'src/application/usecases/get-pet-by-id.usecase';
import { GetUser } from 'src/common/user';
import { PetEntity } from 'src/domain/entities/pet.entity';
import { UpdateResult } from 'typeorm';

@Controller('pet')
export class PetController {
  constructor(
    private readonly createPetUsecase: CreatePetUsecase,
    private readonly getAllPetUsecase: GetAllPetUsecase,
    private readonly selectPetUsecase: SelectPetUsecase,
    private readonly updatePetUsecase: UpdatePetUsecase,
    private readonly archiveUnarchivePetUsecase: ArchiveUnarchivePetUsecase,
    private readonly getPetByIdUsecase: GetPetByIdUsecase,
  ) {}

  @Get()
  getAll() {
    return this.getAllPetUsecase.process();
  }

  @Get(':id')
  getById(@Param('id') petId: string) {
    return this.getPetByIdUsecase.process(petId);
  }

  @Get('select')
  getAllForSelect() {
    return this.selectPetUsecase.process();
  }

  @Post()
  create(@GetUser() user: AuthUserDto, @Body() data: Partial<PetEntity>) {
    data.created_by = user.id;
    return this.createPetUsecase.process(data);
  }

  @Patch()
  archiveUnarchive(
    @GetUser() user: AuthUserDto, 
    @Body() data: { id: string, archived: boolean }
  ): Promise<UpdateResult>{
    return this.archiveUnarchivePetUsecase.process(data, user);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<PetEntity>,
    @GetUser() user: AuthUserDto,
  ): Promise<UpdateResult> {
    return this.updatePetUsecase.process(id, data, user);
  }
}
