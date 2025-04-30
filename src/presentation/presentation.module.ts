import { Module } from "@nestjs/common";
import { UserController, AnimalSpecieController, ClientController, AnimalBreedController } from "./controllers";
import { ApplicationModule } from "src/application/application.module";
import { PetController } from "./controllers/pet.controller";

@Module({
    imports: [ApplicationModule],
    controllers: [
        UserController, 
        AnimalSpecieController, 
        ClientController,
        AnimalBreedController,
        PetController
    ],
    exports: [PresentationModule],
})
export class PresentationModule {}