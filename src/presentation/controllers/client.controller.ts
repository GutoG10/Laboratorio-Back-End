import { GetUser } from 'src/common/user';
import { AuthUserDto } from 'src/application/dto';
import { CreateClientUsecase } from './../../application/usecases/create-client.usecase';
import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
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
    private readonly createClientUsecase:CreateClientUsecase,
  ) {}

  @Get()
  getAll() {
    return this.getAllClientUsecase.process();
  }

  @Get('select')
  getAllForSelect() {
    return this.selectClientUsecase.process();
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() data: DeepPartial<ClientEntity>,
  ): Promise<UpdateResult> {
    return this.editClientUsecase.process(id, data);
  }

  @Post()
  create(
    @GetUser() user: AuthUserDto,
    @Body() data: Partial<ClientEntity>,
  ) {
    data.created_by = user.id;
    return this.createClientUsecase.process(data);
  }
}
