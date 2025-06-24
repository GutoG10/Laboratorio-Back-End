import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne } from "typeorm";
import { UserEntity } from "./user.entity";
import { StockEntryEntity } from "./stock-entry.entity";
import { BaseEntity } from "src/infrastructure/database/base";
import { ManipulationOrderEntity } from "./manipulation-order.entity";
import { StockEntryConsumptionTypeEnum } from "../enum";

@Entity('stock_entry_consumption')
export class StockEntryConsumptionEntity extends BaseEntity {

    @Column({ type: 'uuid', nullable: false })
    stock_entry_id: string;

    @Column({ type: 'uuid', nullable: true })
    manipulation_order_id: string;

    @Column({ type: 'numeric', nullable: true })
    quantity_consumed: number;

    @Column({ type: "numeric", nullable: true})
    price: number;

    @Column({ type: 'enum', enum: StockEntryConsumptionTypeEnum })
    type: StockEntryConsumptionTypeEnum;

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

    @ManyToOne(() => StockEntryEntity)
    @JoinColumn([{ name: 'stock_entry_id', referencedColumnName: 'id' }])
    stockEntry: StockEntryEntity;

    @ManyToOne(() => ManipulationOrderEntity)
    @JoinColumn([{ name: 'manipulation_order_id', referencedColumnName: 'id' }])
    manipulationOrder: ManipulationOrderEntity;
}