import { BaseEntity } from "src/infrastructure/database/base";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne } from "typeorm";
import { TypeEnum } from "../enum";
import { UserEntity } from "./user.entity";

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
    
    @Column({ type: 'enum', enum: TypeEnum, nullable: false })
    type: TypeEnum;

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
}