import { Module } from '@nestjs/common';
import {
  ClientEntity,
  UserEntity,
  AnimalBreedEntity,
  AnimalSpecieEntity,
  MedicEntity,
} from 'src/domain/entities';
import { BaseRepository } from 'src/infrastructure/database/base';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AnimalSpecieRepository,
  AnimalBreedRepository,
  ClientRepository,
  UserRepository,
  MedicRepository,
} from './database/repositories/';
import { PetEntity } from 'src/domain/entities/pet.entity';
import { PetRepository } from './database/repositories/pet.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      AnimalSpecieEntity,
      ClientEntity,
      AnimalBreedEntity,
      PetEntity,
      MedicEntity,
    ]),
  ],
  providers: [
    ClientRepository,
    {
      provide: BaseRepository<ClientEntity>,
      useClass: ClientRepository,
    },
    AnimalSpecieRepository,
    {
      provide: BaseRepository<AnimalSpecieEntity>,
      useClass: AnimalSpecieRepository,
    },
    AnimalBreedRepository,
    {
      provide: BaseRepository<AnimalBreedEntity>,
      useClass: AnimalBreedRepository,
    },
    UserRepository,
    {
      provide: BaseRepository<UserEntity>,
      useClass: UserRepository,
    },
    PetRepository,
    {
      provide: BaseRepository<PetEntity>,
      useClass: PetRepository,
    },
    MedicRepository,
    {
      provide: BaseRepository<MedicEntity>,
      useClass: MedicRepository,
    },
  ],
  exports: [
    UserRepository,
    ClientRepository,
    AnimalSpecieRepository,
    AnimalBreedRepository,
    PetRepository,
    MedicRepository,
  ],
})
export class InfraModule {}
