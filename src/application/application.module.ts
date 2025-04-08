import { Module } from "@nestjs/common";
import { CreateUserUsecase } from "./usecases/create-user.usecase";
import { InfraModule } from "src/infrastructure/infra.module";
import { GetAllAnimalSpecieUsecase } from "./usecases/get-all-animal-specie.usecase";
import { CreateAnimalSpecieUsecase } from "./usecases/create-animal-specie.usecase";
import { GetAllClientUsecase } from "./usecases/get-all-client.usecase";
import { CreateClientUsecase } from "./usecases/create-client.usecase";

@Module({
    imports: [InfraModule],
    providers: [
        GetAllClientUsecase,
        GetAllAnimalSpecieUsecase,
        CreateAnimalSpecieUsecase,
        CreateUserUsecase,
        CreateClientUsecase,
    ], 
    exports: [
        GetAllClientUsecase, 
        GetAllAnimalSpecieUsecase, 
        CreateAnimalSpecieUsecase,
        CreateUserUsecase,
        CreateClientUsecase,
    ],
})
export class ApplicationModule {}