import { Module } from "@nestjs/common";
import { CreateUserUsecase } from "./usecases/create-user.usecase";
import { InfraModule } from "src/infrastructure/infra.module";

@Module({
    imports: [InfraModule],
    providers: [
        CreateUserUsecase,
    ],
    exports: [CreateUserUsecase]
})
export class ApplicationModule {}