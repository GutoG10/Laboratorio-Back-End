import { Module } from "@nestjs/common";
import { UserController, AnimalSpecieController, ClientController } from "./controllers";
import { ApplicationModule } from "src/application/application.module";

@Module({
    imports: [ApplicationModule],
    controllers: [
        UserController, 
        AnimalSpecieController, 
        ClientController,
    ],
    exports: [PresentationModule],
})
export class PresentationModule {}