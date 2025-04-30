import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { GetAllAnimalBreedUsecase, CreateAnimalBreedUsecase, SelectAnimalBreedUsecase } from "src/application/usecases";
import { AnimalBreedEntity } from "src/domain/entities";

@Controller('animal_breed')
export class AnimalBreedController {
  constructor(
    private readonly createAnimalBreedUsecase: CreateAnimalBreedUsecase,
    private readonly getAllAnimalBreedUsecase: GetAllAnimalBreedUsecase,
    private readonly selectAnimalBreedUsecase: SelectAnimalBreedUsecase,
  ) {}

  @Get()
  getAll() {
    return this.getAllAnimalBreedUsecase.process();
  }

  @Get('select/:specie_id')
  getAllForSelect(@Param('specie_id') specie: string){
    return this.selectAnimalBreedUsecase.process(specie);
  }

  @Post()
  create(@Body() data: Partial<AnimalBreedEntity>) {
    return this.createAnimalBreedUsecase.process(data);
  }
}
