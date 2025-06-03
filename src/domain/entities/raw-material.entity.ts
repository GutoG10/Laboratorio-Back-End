import { BaseEntity } from "src/infrastructure/database/base";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne } from "typeorm";
import { TypeEnum, UnitEnum } from "../enum";
import { TherapeuticClassEnum } from "../enum/therapeutic-class.enum";
import { UserEntity } from "./user.entity";

@Entity('raw_material')
export class RawMaterialEntity extends BaseEntity {
    
    @Column({ type: 'int4', nullable: false})
    code: number;

    @Column({ type: 'varchar', length: 100, nullable: false })
    name: string;

    @Column({ type: 'enum', enum: TypeEnum, nullable: false })
    type: TypeEnum;

    @Column({ type: 'enum', enum: UnitEnum, nullable: false })
    unit: UnitEnum;

    @Column({ type: 'varchar', length: 10, nullable: false })
    crmv: string;

    @Column({ type: 'bool', default: false, nullable: true })
    is_refrigerated: boolean;

    @Column({ type: 'enum', enum: TherapeuticClassEnum, nullable: true })
    therapeutic_class: TherapeuticClassEnum;

    @Column({ type: 'varchar', length: 1000, nullable: true })
    notes: string;

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