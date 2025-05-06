import { Module } from '@nestjs/common';
import {
  UserController,
  AnimalSpecieController,
  ClientController,
  AnimalBreedController,
  PetController
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
 ],
  exports: [PresentationModule],
})
export class PresentationModule {}
