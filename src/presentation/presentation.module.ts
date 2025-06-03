import { Module } from '@nestjs/common';
import {
  UserController,
  AnimalSpecieController,
  ClientController,
  AnimalBreedController,
  PetController,
  MedicController,
  RawMaterialController,
  StockEntryController
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
  ],
  exports: [PresentationModule],
})
export class PresentationModule {}
