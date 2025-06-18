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
  SupplierController,
  ManipulationOrderController
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
    ManipulationOrderController
  ],
  exports: [PresentationModule],
})
export class PresentationModule {}
