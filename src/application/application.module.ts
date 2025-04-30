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
    GetAllPetUsecase,
    GetAllAnimalSpecieByNameUsecase,
    SelectAnimalBreedUsecase,
    SelectAnimalSpecieUsecase,
    SelectClientUsecase,
    SelectPetUsecase,
    SelectUserUsecase
} from "./usecases";
import { EditClientUsecase } from "./usecases/edit-client.usecase";

@Module({
    imports: [InfraModule],
    providers: [
        EditClientUsecase,
        SelectAnimalBreedUsecase,
        SelectAnimalSpecieUsecase,
        SelectPetUsecase,
        SelectClientUsecase,
        SelectUserUsecase,
        GetAllClientUsecase,
        GetAllAnimalSpecieUsecase,
        CreateAnimalSpecieUsecase,
        GetAllAnimalSpecieByNameUsecase,
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
        SelectAnimalBreedUsecase,
        SelectAnimalSpecieUsecase,
        SelectPetUsecase,
        SelectUserUsecase,
        SelectClientUsecase,
        GetAllAnimalSpecieUsecase, 
        CreateAnimalSpecieUsecase,
        GetAllAnimalSpecieByNameUsecase,
        CreateUserUsecase,
        CreateAnimalBreedUsecase,
        GetAllAnimalBreedUsecase,
        CreateClientUsecase,
        CreatePetUsecase,
        GetAllPetUsecase
    ],
})
export class ApplicationModule {}