import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/infrastructure/database/base";
import { ClientEntity } from "src/domain/entities";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ClientRepository extends BaseRepository<ClientEntity>{

    constructor(@InjectRepository(ClientEntity) private _repository: Repository<ClientEntity>) {
        super(_repository);
    }
}