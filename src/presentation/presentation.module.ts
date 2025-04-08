import { Module } from "@nestjs/common";
import { UserController, AnimalSpecieController, ClientController, AnimalBreedController } from "./controllers";
import { ApplicationModule } from "src/application/application.module";

@Module({
    imports: [ApplicationModule],
    controllers: [
        UserController, 
        AnimalSpecieController, 
        ClientController,
        AnimalBreedController
    ],
    exports: [PresentationModule],
})
export class PresentationModule {}