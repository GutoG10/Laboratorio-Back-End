import { BaseEntity } from "src/infrastructure/database/base";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne } from "typeorm";
import { ManipulationOrderTypeEnum, TypeEnum } from "../enum";
import { UserEntity } from "./user.entity";
import { MedicEntity } from "./medic.entity";
import { PetEntity } from "./pet.entity";
import { timestamp } from "rxjs";

@Entity('manipulation_order')
export class ManipulationOrderEntity extends BaseEntity {
    
    @Column({ type: 'int4', nullable: false })
    code: number;

    @Column({ type: 'uuid', nullable: false })
    pet_id: string;

    @Column({ type: 'uuid', nullable: false })
    medic_id: string;

    @Column({ type: 'int4', nullable: false })
    total_quantity: number;
    
    @Column({ type: 'enum', enum: ManipulationOrderTypeEnum, nullable: false })
    type: ManipulationOrderTypeEnum;

    @Column({ type: 'timestamp', nullable: false})
    expiration_date: Date;

    @CreateDateColumn({ type: 'uuid' })
    created_by: string;

    @Column({ type: 'timestamp' })
    created_at: Date;

    @Column({ type: 'uuid', nullable: true })
    edited_by: string;

    @Column({ type: 'timestamp', nullable: true })
    edited_at: Date;

    @Column({ type: 'uuid', nullable: true })
    archived_by: string;

    @Column({ type: 'timestamp', nullable: true })
    archived_at: Date;

    @ManyToOne(() => UserEntity)
    @JoinColumn([{ name: 'archived_by', referencedColumnName: 'id' }])
    archivedBy: UserEntity;

    @ManyToOne(() => UserEntity)
    @JoinColumn([{ name: 'created_by', referencedColumnName: 'id' }])
    createdBy: UserEntity;

    @ManyToOne(() => UserEntity)
    @JoinColumn([{ name: 'edited_by', referencedColumnName: 'id' }])
    editedBy: UserEntity;

    @ManyToOne(() => MedicEntity)
    @JoinColumn([{ name: 'medic_id', referencedColumnName: 'id' }])
    medic: MedicEntity;

    @ManyToOne(() => PetEntity)
    @JoinColumn([{ name: 'pet_id', referencedColumnName: 'id' }])
    pet: PetEntity;
}