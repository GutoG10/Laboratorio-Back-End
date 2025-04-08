import { Module } from "@nestjs/common";
import { CreateUserUsecase } from "./usecases/create-user.usecase";
import { InfraModule } from "src/infrastructure/infra.module";
import { GetAllAnimalSpecieUsecase } from "./usecases/get-all-animal-specie.usecase";
import { CreateAnimalSpecieUsecase } from "./usecases/create-animal-specie.usecase";
import { CreateAnimalBreedUsecase } from './usecases/create-animal-breed.usecase'; 
import { GetAllAnimalBreedUsecase } from './usecases/get-all-animal-breed.usecase'; 
import { GetAllClientUsecase } from "./usecases/get-all-client.usecase";
import { CreateClientUsecase } from "./usecases/create-client.usecase";

@Module({
    imports: [InfraModule],
    providers: [
        GetAllClientUsecase,
        GetAllAnimalSpecieUsecase,
        CreateAnimalSpecieUsecase,
        CreateUserUsecase,
        CreateAnimalBreedUsecase, 
        GetAllAnimalBreedUsecase,
        CreateClientUsecase,
    ], 
    exports: [
        GetAllClientUsecase, 
        GetAllAnimalSpecieUsecase, 
        CreateAnimalSpecieUsecase,
        CreateUserUsecase,
        CreateAnimalBreedUsecase,
        GetAllAnimalBreedUsecase,
        CreateClientUsecase,
    ],
})
export class ApplicationModule {}