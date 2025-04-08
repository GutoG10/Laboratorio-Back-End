import { Controller, Get, Put } from "@nestjs/common";
import { GetAllClientUsecase } from "src/application/usecases/get-all-client.usecase";

@Controller('client')
export class ClientController{
    constructor(private readonly getAllClientUsecase: GetAllClientUsecase){}

    @Get()
    getAll(){
        return this.getAllClientUsecase.process();
    }

    @Put()
    create(){
        return this.getAllClientUsecase.process();
    }
    
}