import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { AuthUserDto } from 'src/application/dto';
import {
  GetAllAnimalBreedUsecase,
  CreateAnimalBreedUsecase,
  SelectAnimalBreedUsecase,
  UpdateAnimalBreedUsecase,
} from 'src/application/usecases';
import { GetUser } from 'src/common/user';
import { AnimalBreedEntity, AnimalSpecieEntity } from 'src/domain/entities';
import { UpdateResult } from 'typeorm';

@Controller('animal_breed')
export class AnimalBreedController {
  constructor(
    private readonly createAnimalBreedUsecase: CreateAnimalBreedUsecase,
    private readonly getAllAnimalBreedUsecase: GetAllAnimalBreedUsecase,
    private readonly selectAnimalBreedUsecase: SelectAnimalBreedUsecase,
    private readonly updateAnimalBreedUsecase: UpdateAnimalBreedUsecase,
  ) {}

  @Get()
  getAll() {
    return this.getAllAnimalBreedUsecase.process();
  }

  @Get('select/:specie_id')
  getAllForSelect(@Param('specie_id') specie: string) {
    return this.selectAnimalBreedUsecase.process(specie);
  }

  @Put(':id')
  update(
    @GetUser() user: AuthUserDto, 
    @Param('id') id: string, 
    @Body() data: Partial<AnimalBreedEntity>
  ): Promise<UpdateResult>{
    return this.updateAnimalBreedUsecase.process(id, data, user);
  }

  @Post()
  create(
    @GetUser() user: AuthUserDto,
    @Body() data: Partial<AnimalBreedEntity>
  ) {
    data.created_by = user.id
    return this.createAnimalBreedUsecase.process(data);
  }
}
