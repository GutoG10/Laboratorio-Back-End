import { BaseEntity } from "src/infrastructure/database/base";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne } from "typeorm";
import { UserEntity } from "./user.entity";
import { RawMaterialEntity } from "./raw-material.entity";

@Entity('stock_entry')
export class StockEntryEntity extends BaseEntity {
    
    @Column({ type: 'uuid' })
    raw_material_id: string;

    @Column({ type: 'uuid' })
    supplier_id: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    batch_code: string;

    @Column({ type: 'timestamp', nullable: false })
    expiration_date: Date;

    @Column({ type: 'numeric', nullable: false })
    quantity: number;

    @Column({ type: 'numeric', nullable: false })
    unit_price: number;

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

    @ManyToOne(() => RawMaterialEntity)
    @JoinColumn([{ name: 'raw_material_id', referencedColumnName: 'id' }])
    rawMaterial: RawMaterialEntity;

    // @ManyToOne(() => SupplierEntity)
    // @JoinColumn([{ name: 'supplier_id', referencedColumnName: 'id' }])
    // supplier: SupplierEntity;
}