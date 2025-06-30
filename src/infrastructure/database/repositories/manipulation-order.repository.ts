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

    getAllWithRelations(): Promise<ManipulationOrderEntity[]> {
        return this._repository
        .createQueryBuilder('manipulationOrder')
        .leftJoinAndSelect('manipulationOrder.pet', 'pet')
        .leftJoinAndSelect('pet.client', 'client')
        .leftJoinAndSelect('manipulationOrder.medic', 'medic')
        .leftJoinAndSelect('manipulationOrder.createdBy', 'creator')
        .select([
            'manipulationOrder.id',
            'manipulationOrder.code',
            'manipulationOrder.expiration_date',
            'manipulationOrder.total_quantity',
            'manipulationOrder.created_at',
            'manipulationOrder.archived',
            'pet.id',
            'pet.name',
            'client.id',
            'client.name',
            'client.last_name',
            'medic.id',
            'medic.name',
            'medic.last_name',
            'creator.id',
            'creator.name',
            'creator.last_name',
        ])
        .orderBy('manipulationOrder.code', 'DESC')
        .addOrderBy('manipulationOrder.expiration_date', 'ASC')
        .addOrderBy('manipulationOrder.created_at', 'ASC')
        .getMany();
    }

    getByIdWithRelations(id: string): Promise<ManipulationOrderEntity | null> {
        return this._repository
        .createQueryBuilder('manipulationOrder')
        .leftJoinAndSelect('manipulationOrder.pet', 'pet')
        .leftJoinAndSelect('pet.client', 'client')
        .leftJoinAndSelect('pet.animalBreed', 'animalBreed')
        .leftJoinAndSelect('pet.animalSpecie', 'animalSpecie')
        .leftJoinAndSelect('manipulationOrder.medic', 'medic')
        .leftJoinAndSelect('manipulationOrder.createdBy', 'creator')
        .leftJoinAndSelect('manipulationOrder.archivedBy', 'archivedBy')
        .leftJoinAndSelect('manipulationOrder.editedBy', 'editor')
        .select([
            'manipulationOrder.id',
            'manipulationOrder.code',
            'manipulationOrder.expiration_date',
            'manipulationOrder.total_quantity',
            'manipulationOrder.created_at',
            'manipulationOrder.type',
            'manipulationOrder.archived',
            'pet.id',
            'pet.name',
            'pet.birth_date',
            'pet.weight',
            'pet.notes',
            'pet.archived',
            'animalBreed.id',
            'animalBreed.name',
            'animalSpecie.id',
            'animalSpecie.name',
            'client.id',
            'client.name',
            'client.last_name',
            'client.phone',
            'client.email',
            'client.address',
            'client.notes',
            'client.archived',
            'medic.id',
            'medic.name',
            'medic.last_name',
            'medic.crmv',
            'medic.notes',
            'medic.email',
            'medic.archived',
            'creator.id',
            'creator.name',
            'creator.last_name',
            'archivedBy.id',
            'archivedBy.name',
            'archivedBy.last_name',
            'editor.id',
            'editor.name',
            'editor.last_name',
        ])
        .where('manipulationOrder.id = :id', { id })
        .orderBy('manipulationOrder.expiration_date', 'ASC')
        .addOrderBy('manipulationOrder.created_at', 'ASC')
        .getOne();
    }

}