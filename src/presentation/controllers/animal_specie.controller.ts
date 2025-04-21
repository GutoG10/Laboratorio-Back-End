import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateAnimalSpecieUsecase, GetAllAnimalSpecieUsecase } from "src/application/usecases";
import { AnimalSpecieEntity } from "src/domain/entities";

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