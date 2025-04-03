import { Injectable } from "@nestjs/common";
import { BaseEntity } from "./base.entity";
import { DeepPartial, FindOptionsWhere, Repository, UpdateResult } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

@Injectable()
export abstract class BaseRepository<T extends BaseEntity> {

    private repository: Repository<T>;

    constructor(
       repository: Repository<T>,
    ) {
        this.repository = repository;
    }

    async getAll(): Promise<T[]> {
        return this.repository.find();
    } 

    async getById(id: string): Promise<T | null> {
        return this.repository.findOneBy({ id: id } as unknown as FindOptionsWhere<T>);
      }
    
      async create(entity: DeepPartial<T>): Promise<T> {
        return this.repository.save(entity);
      }
    
      async update(id: string, entity: DeepPartial<T>): Promise<UpdateResult> {
        return await this.repository.update(id, entity as QueryDeepPartialEntity<T>);
      }
    
      async delete(id: string): Promise<void> {
        await this.repository.delete(id);
      }

}