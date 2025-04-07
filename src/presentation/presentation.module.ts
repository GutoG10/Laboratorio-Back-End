import { Module } from "@nestjs/common";
import { UserController, AnimalSpecieController, AnimalBreedController } from "./controllers";
import { ApplicationModule } from "src/application/application.module";

@Module({
    imports: [ApplicationModule],
    controllers: [UserController, AnimalSpecieController, AnimalBreedController,],
    exports: [PresentationModule],
})
export class PresentationModule {}