import { Module } from "@nestjs/common";
import { CreateUserUsecase } from "./usecases/create-user.usecase";
import { InfraModule } from "src/infrastructure/infra.module";
import { GetAllAnimalSpecieUsecase } from "./usecases/get-all-animal-specie.usecase";
import { CreateAnimalSpecieUsecase } from "./usecases/create-animal-specie.usecase";

@Module({
    imports: [InfraModule],
    providers: [
        GetAllAnimalSpecieUsecase,
        CreateAnimalSpecieUsecase,
        CreateUserUsecase,
    ],
    exports: [CreateUserUsecase, GetAllAnimalSpecieUsecase, CreateAnimalSpecieUsecase]
})
export class ApplicationModule {}