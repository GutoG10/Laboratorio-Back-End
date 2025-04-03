import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateAnimalSpecieUsecase } from "src/application/usecases/create-animal-specie.usecase";
import { GetAllAnimalSpecieUsecase } from "src/application/usecases/get-all-animal-specie.usecase";
import { AnimalSpecieEntity } from "src/domain/entities/animal-specie.entity";

@Controller('animal_specie')
export class AnimalSpecieController{
    constructor(
        private readonly createAnimalSpecieUsecase: CreateAnimalSpecieUsecase,
        private readonly getAllAnimalSpecieUsecase: GetAllAnimalSpecieUsecase,
    ){}

    @Get()
    getAll(){
        return this.getAllAnimalSpecieUsecase.process();
    }

    @Post()
    create(@Body() data: Partial<AnimalSpecieEntity>) {
        return this.createAnimalSpecieUsecase.process(data);
      }
}