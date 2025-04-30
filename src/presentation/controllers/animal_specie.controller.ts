import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { CreateAnimalSpecieUsecase, GetAllAnimalSpecieByNameUsecase, GetAllAnimalSpecieUsecase, SelectAnimalSpecieUsecase } from "src/application/usecases";
import { AnimalSpecieEntity } from "src/domain/entities";

@Controller('animal_specie')
export class AnimalSpecieController{
    constructor(
        private readonly createAnimalSpecieUsecase: CreateAnimalSpecieUsecase,
        private readonly getAllAnimalSpecieUsecase: GetAllAnimalSpecieUsecase,
        private readonly getAllAnimalSpecieByNameUsecase: GetAllAnimalSpecieByNameUsecase,
        private readonly selectAnimalSpecieUsecase: SelectAnimalSpecieUsecase,
    ) {}

    @Get()
    getAll(){
        return this.getAllAnimalSpecieUsecase.process();
    }

    @Get('select')
    getAllForSelect(){
      return this.selectAnimalSpecieUsecase.process();
    }

    @Get('animal')
    getAnimalByName(
    @Query('search') search: string,
    @Query('archived') archived: boolean,
    ){
        return this.getAllAnimalSpecieByNameUsecase.process(search, archived);
    }

    @Post()
    create(@Body() data: Partial<AnimalSpecieEntity>) {
        return this.createAnimalSpecieUsecase.process(data);
    }
}