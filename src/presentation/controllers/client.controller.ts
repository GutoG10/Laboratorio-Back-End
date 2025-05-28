import { GetUser } from 'src/common/user';
import { AuthUserDto } from 'src/application/dto';
import { CreateClientUsecase } from './../../application/usecases/create-client.usecase';
import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import {
  ArchiveUnarchiveClientUsecase,
  GetAllClientUsecase,
  SelectClientUsecase,
  UpdateClientUsecase,
} from 'src/application/usecases';
import { ClientEntity } from 'src/domain/entities';
import { DeepPartial, UpdateResult } from 'typeorm';

@Controller('client')
export class ClientController {
  constructor(
    private readonly getAllClientUsecase: GetAllClientUsecase,
    private readonly updateClientUsecase: UpdateClientUsecase,
    private readonly selectClientUsecase: SelectClientUsecase,
    private readonly createClientUsecase:CreateClientUsecase,
    private readonly archiveUnarchiveClientUsecase: ArchiveUnarchiveClientUsecase,
  ) {}

  @Get()
  getAll() {
    return this.getAllClientUsecase.process();
  }

  @Get('select')
  getAllForSelect() {
    return this.selectClientUsecase.process();
  }

  @Patch()
  archiveUnarchive(
    @GetUser() user: AuthUserDto, 
    @Body() data: { id: string, archived: boolean }
  ): Promise<UpdateResult>{
    return this.archiveUnarchiveClientUsecase.process(data, user);
  }

  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<ClientEntity>,
    @GetUser() user: AuthUserDto,
  ): Promise<UpdateResult> {
    return this.updateClientUsecase.process(id, data, user);
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
