import { Body, Controller, Get, Param, Patch, Put } from "@nestjs/common";
import { EditClientUsecase, GetAllClientUsecase } from "src/application/usecases";
import { ClientEntity } from "src/domain/entities";
import { DeepPartial, UpdateResult } from "typeorm";

@Controller('client')
export class ClientController{
    constructor(
        private readonly getAllClientUsecase: GetAllClientUsecase,
        private readonly editClientUsecase: EditClientUsecase,
    ){}

    @Get()
    getAll(){
        return this.getAllClientUsecase.process();
    }

    @Put()
    create(){
        return this.getAllClientUsecase.process();
    }

    @Patch('/:id')
    update(
        @Param('id') id: string, 
        @Body() data: DeepPartial<ClientEntity>
    ): Promise<UpdateResult>{
        return this.editClientUsecase.process(id, data);
    }
    
}