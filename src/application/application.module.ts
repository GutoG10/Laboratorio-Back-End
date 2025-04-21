import { Module } from "@nestjs/common";
import { CreateUserUsecase } from "./usecases/create-user.usecase";
import { InfraModule } from "src/infrastructure/infra.module";
import { 
    GetAllAnimalSpecieUsecase, 
    CreateAnimalSpecieUsecase, 
    CreateAnimalBreedUsecase, 
    GetAllAnimalBreedUsecase, 
    GetAllClientUsecase, 
    CreateClientUsecase 
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
    ],
})
export class ApplicationModule {}