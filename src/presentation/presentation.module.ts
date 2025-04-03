import { Module } from "@nestjs/common";
import { UserController } from "./controllers/user.controller";
import { ApplicationModule } from "src/app/application.module";

@Module({
    imports: [ApplicationModule],
    controllers: [UserController],
    exports: [PresentationModule],
})
export class PresentationModule {}