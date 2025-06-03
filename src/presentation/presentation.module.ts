import { Module } from '@nestjs/common';
import {
  UserController,
  AnimalSpecieController,
  ClientController,
  AnimalBreedController,
  PetController,
  MedicController,
  RawMaterialController,
  StockEntryController,
  SupplierController
} from './controllers';
import { ApplicationModule } from 'src/application/application.module';

@Module({
  imports: [ApplicationModule],
  controllers: [
    UserController,
    AnimalSpecieController,
    ClientController,
    AnimalBreedController,
    PetController,
    MedicController,
    RawMaterialController,
    StockEntryController,
    SupplierController,
  ],
  exports: [PresentationModule],
})
export class PresentationModule {}
