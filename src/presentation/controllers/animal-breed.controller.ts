import { Body, Controller, Get, Post } from "@nestjs/common";
import { GetAllAnimalBreedUsecase, CreateAnimalBreedUsecase } from "src/application/usecases";
import { AnimalBreedEntity } from "src/domain/entities";

@Controller('animal_breed')
export class AnimalBreedController {
  constructor(
    private readonly createAnimalBreedUsecase: CreateAnimalBreedUsecase,
    private readonly getAllAnimalBreedUsecase: GetAllAnimalBreedUsecase,
  ) {}

  @Get()
  getAll() {
    return this.getAllAnimalBreedUsecase.process();
  }

  @Post()
  create(@Body() data: Partial<AnimalBreedEntity>) {
    return this.createAnimalBreedUsecase.process(data);
  }
}
