import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "src/infrastructure/database/base/base.entity";
import { AnimalSpecieEntity } from "./animal-specie.entity";


@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 255 })
    password: string;
}