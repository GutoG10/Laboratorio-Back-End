import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ManipulationOrderEntity } from "src/domain/entities/manipulation-order.entity";
import { Repository } from "typeorm";
import { BaseRepository } from "../base";

@Injectable()
export class ManipulationOrderRepository extends BaseRepository<ManipulationOrderEntity> {
    constructor(
        @InjectRepository(ManipulationOrderEntity)
        private _repository: Repository<ManipulationOrderEntity>,
    ) {
        super(_repository);
    }

    

}