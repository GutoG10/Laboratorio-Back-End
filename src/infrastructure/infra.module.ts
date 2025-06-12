import { Module } from '@nestjs/common';
import {
  ClientEntity,
  UserEntity,
  AnimalBreedEntity,
  AnimalSpecieEntity,
  MedicEntity,
  RawMaterialEntity,
  StockEntryEntity,
  SupplierEntity,
  StockEntryConsumptionEntity,
} from 'src/domain/entities';
import { BaseRepository } from 'src/infrastructure/database/base';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AnimalSpecieRepository,
  AnimalBreedRepository,
  ClientRepository,
  UserRepository,
  MedicRepository,
  RawMaterialRepository,
  StockEntryRepository,
  SupplierRepository,
  StockEntryConsumptionRepository,
} from './database/repositories/';
import { PetEntity } from 'src/domain/entities/pet.entity';
import { PetRepository } from './database/repositories/pet.repository';
import { ManipulationOrderEntity } from 'src/domain/entities/manipulation-order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      AnimalSpecieEntity,
      ClientEntity,
      AnimalBreedEntity,
      PetEntity,
      MedicEntity,
      RawMaterialEntity,
      StockEntryEntity,
      SupplierEntity,
      StockEntryConsumptionEntity,
      ManipulationOrderEntity,
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
    RawMaterialRepository,
    {
      provide: BaseRepository<RawMaterialEntity>,
      useClass: RawMaterialRepository,
    },
    StockEntryRepository,
    {
      provide: BaseRepository<StockEntryEntity>,
      useClass: StockEntryRepository,
    },
    SupplierRepository,
    {
      provide: BaseRepository<SupplierEntity>,
      useClass: SupplierRepository, 
    },
    StockEntryConsumptionRepository,
    {
      provide: BaseRepository<StockEntryConsumptionEntity>,
      useClass: StockEntryConsumptionRepository,
    },
  ],
  exports: [
    UserRepository,
    ClientRepository,
    AnimalSpecieRepository,
    AnimalBreedRepository,
    PetRepository,
    MedicRepository,
    RawMaterialRepository,
    StockEntryRepository,
    SupplierRepository,
    StockEntryConsumptionRepository,
  ],
})
export class InfraModule {}
