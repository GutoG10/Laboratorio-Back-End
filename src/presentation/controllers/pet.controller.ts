import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  CreatePetUsecase,
  GetAllPetUsecase,
  SelectPetUsecase,
} from 'src/application/usecases';
import { PetEntity } from 'src/domain/entities/pet.entity';

@Controller('pet')
export class PetController {
  constructor(
    private readonly createPetUsecase: CreatePetUsecase,
    private readonly getAllPetUsecase: GetAllPetUsecase,
    private readonly selectPetUsecase: SelectPetUsecase,
  ) {}

  @Get()
  getAll() {
    return this.getAllPetUsecase.process();
  }

  @Get('select')
  getAllForSelect() {
    return this.selectPetUsecase.process();
  }

  @Post()
  create(@Body() data: Partial<PetEntity>) {
    return this.createPetUsecase.process(data);
  }
}
