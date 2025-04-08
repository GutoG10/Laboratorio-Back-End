import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateAnimalBreedUsecase } from "src/application/usecases/create-animal-breed.usecase";
import { GetAllAnimalBreedUsecase } from "src/application/usecases/get-all-animal-breed.usecase";
import { AnimalBreedEntity } from "src/domain/entities/animal-breed.entity";

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
