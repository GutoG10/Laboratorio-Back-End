import { Injectable } from "@nestjs/common";
import { RawMaterialRepository } from "src/infrastructure/database/repositories";

@Injectable()
export class CheckRawMaterialNameUsecase {
    constructor(private readonly repository: RawMaterialRepository) {}

    async process(name: string): Promise<boolean> {
        const nameExists = await this.repository.getByName(name);

        return nameExists ? true : false;


    }
}