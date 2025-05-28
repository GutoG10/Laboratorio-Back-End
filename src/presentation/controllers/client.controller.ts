import { GetClientByIdUsecase } from './../../application/usecases/get-client-by-id.usecase';
import { GetUser } from 'src/common/user';
import { AuthUserDto } from 'src/application/dto';
import { CreateClientUsecase } from './../../application/usecases/create-client.usecase';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import {
  GetAllClientUsecase,
  SelectClientUsecase,
  UpdateClientUsecase,
} from 'src/application/usecases';
import { ClientEntity } from 'src/domain/entities';
import { UpdateResult } from 'typeorm';

@Controller('client')
export class ClientController {
  constructor(
    private readonly getAllClientUsecase: GetAllClientUsecase,
    private readonly updateClientUsecase: UpdateClientUsecase,
    private readonly selectClientUsecase: SelectClientUsecase,
    private readonly createClientUsecase: CreateClientUsecase,
    private readonly getClientByIdUsecase: GetClientByIdUsecase,
  ) {}

  @Get()
  getAll() {
    return this.getAllClientUsecase.process();
  }

  @Get('select')
  getAllForSelect() {
    return this.selectClientUsecase.process();
  }

  @Get(':id')
  getById(@Param('id') clientid: string) {
    return this.getClientByIdUsecase.process(clientid);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<ClientEntity>,
    @GetUser() user: AuthUserDto,
  ): Promise<UpdateResult> {
    return this.updateClientUsecase.process(id, data, user);
  }

  @Post()
  create(@GetUser() user: AuthUserDto, @Body() data: Partial<ClientEntity>) {
    data.created_by = user.id;
    return this.createClientUsecase.process(data);
  }
}
