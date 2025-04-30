import { Module } from "@nestjs/common";
import { CreateUserUsecase } from "./usecases/create-user.usecase";
import { InfraModule } from "src/infrastructure/infra.module";
import { 
    GetAllAnimalSpecieUsecase, 
    CreateAnimalSpecieUsecase, 
    CreateAnimalBreedUsecase, 
    GetAllAnimalBreedUsecase, 
    GetAllClientUsecase, 
    CreateClientUsecase,
    CreatePetUsecase,
    GetAllPetUsecase
} from "./usecases";
import { EditClientUsecase } from "./usecases/edit-client.usecase";

@Module({
    imports: [InfraModule],
    providers: [
        EditClientUsecase,
        GetAllClientUsecase,
        GetAllAnimalSpecieUsecase,
        CreateAnimalSpecieUsecase,
        CreateUserUsecase,
        CreateAnimalBreedUsecase, 
        GetAllAnimalBreedUsecase,
        CreateClientUsecase,
        CreatePetUsecase,
        GetAllPetUsecase
    ], 
    exports: [
        EditClientUsecase,
        GetAllClientUsecase, 
        GetAllAnimalSpecieUsecase, 
        CreateAnimalSpecieUsecase,
        CreateUserUsecase,
        CreateAnimalBreedUsecase,
        GetAllAnimalBreedUsecase,
        CreateClientUsecase,
        CreatePetUsecase,
        GetAllPetUsecase
    ],
})
export class ApplicationModule {}