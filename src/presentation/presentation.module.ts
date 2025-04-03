import { Module } from "@nestjs/common";
import { UserController, AnimalSpecieController } from "./controllers";
import { ApplicationModule } from "src/application/application.module";

@Module({
    imports: [ApplicationModule],
    controllers: [UserController, AnimalSpecieController],
    exports: [PresentationModule],
})
export class PresentationModule {}