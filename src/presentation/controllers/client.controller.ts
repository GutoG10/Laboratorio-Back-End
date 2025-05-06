import { Body, Controller, Get, Param, Patch, Put } from '@nestjs/common';
import {
  EditClientUsecase,
  GetAllClientUsecase,
  SelectClientUsecase,
} from 'src/application/usecases';
import { ClientEntity } from 'src/domain/entities';
import { DeepPartial, UpdateResult } from 'typeorm';

@Controller('client')
export class ClientController {
  constructor(
    private readonly getAllClientUsecase: GetAllClientUsecase,
    private readonly editClientUsecase: EditClientUsecase,
    private readonly selectClientUsecase: SelectClientUsecase,
  ) {}

  @Get()
  getAll() {
    return this.getAllClientUsecase.process();
  }

  @Get('select')
  getAllForSelect() {
    return this.selectClientUsecase.process();
  }

  @Put()
  create() {
    return this.getAllClientUsecase.process();
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() data: DeepPartial<ClientEntity>,
  ): Promise<UpdateResult> {
    return this.editClientUsecase.process(id, data);
  }
}
