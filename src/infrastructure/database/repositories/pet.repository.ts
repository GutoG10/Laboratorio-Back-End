import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../base/base.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PetEntity } from 'src/domain/entities/pet.entity';

@Injectable()
export class PetRepository extends BaseRepository<PetEntity> {
  constructor(
    @InjectRepository(PetEntity) private _repository: Repository<PetEntity>,
  ) {
    super(_repository);
  }

  async getAllForSelect(): Promise<Partial<PetEntity[]>> {
    return this._repository
      .createQueryBuilder('pet')
      .select(['pet.id', 'pet.name'])
      .getMany();
  }
}
