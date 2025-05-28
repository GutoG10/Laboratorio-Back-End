import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AuthUserDto } from 'src/application/dto';
import {
  CreateAnimalSpecieUsecase,
  GetAllAnimalSpecieByNameUsecase,
  GetAllAnimalSpecieUsecase,
  GetAnimalSpecieByIdUsecase,
  SelectAnimalSpecieUsecase,
  UpdateAnimalSpecieUsecase,
} from 'src/application/usecases';
import { GetUser } from 'src/common/user';
import { AnimalSpecieEntity } from 'src/domain/entities';
import { UpdateResult } from 'typeorm';

@Controller('animal_specie')
export class AnimalSpecieController {
  constructor(
    private readonly createAnimalSpecieUsecase: CreateAnimalSpecieUsecase,
    private readonly getAllAnimalSpecieUsecase: GetAllAnimalSpecieUsecase,
    private readonly getAllAnimalSpecieByNameUsecase: GetAllAnimalSpecieByNameUsecase,
    private readonly selectAnimalSpecieUsecase: SelectAnimalSpecieUsecase,
    private readonly updateAnimalSpecieUsecase: UpdateAnimalSpecieUsecase,
    private readonly getAnimalSpecieByIdUsecase: GetAnimalSpecieByIdUsecase,
  ) {}

  @Get()
  getAll() {
    return this.getAllAnimalSpecieUsecase.process();
  }

  @Get('select')
  getAllForSelect() {
    return this.selectAnimalSpecieUsecase.process();
  }

  @Get('animal')
  getAnimalByName(
    @Query('search') search: string,
    @Query('archived') archived: boolean,
  ) {
    return this.getAllAnimalSpecieByNameUsecase.process(search, archived);
  }

  @Get(':id')
  getById(@Param('id') animalSpecieId: string) {
    return this.getAnimalSpecieByIdUsecase.process(animalSpecieId);
  }

  @Put(':id')
  update(
    @GetUser() user: AuthUserDto,
    @Param('id') id: string,
    @Body() data: Partial<AnimalSpecieEntity>,
  ): Promise<UpdateResult> {
    return this.updateAnimalSpecieUsecase.process(id, data, user);
  }

  @Post()
  create(
    @GetUser() user: AuthUserDto,
    @Body() data: Partial<AnimalSpecieEntity>,
  ) {
    data.created_by = user.id;
    return this.createAnimalSpecieUsecase.process(data);
  }
}
