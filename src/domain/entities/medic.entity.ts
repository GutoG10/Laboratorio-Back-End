import { BaseEntity } from 'src/infrastructure/database/base';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from 'src/domain/entities';

@Entity('medic')
export class MedicEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  last_name: string;

  @Column({ type: 'varchar', length: 10, nullable: false })
  crmv: string;

  @Column({ type: 'varchar', length: 1000 })
  notes: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'uuid' })
  created_by: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn([{ name: 'created_by', referencedColumnName: 'id' }])
  createdBy: UserEntity;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @Column({ type: 'uuid', nullable: true })
  edited_by: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn([{ name: 'edited_by', referencedColumnName: 'id' }])
  editedBy: UserEntity;

  @Column({ type: 'timestamp', nullable: true })
  edited_at: Date;

  @Column({ type: 'uuid', nullable: true })
  archived_by: string;
  
  @ManyToOne(() => UserEntity)
  @JoinColumn([{ name: 'archived_by', referencedColumnName: 'id' }])
  archivedBy: UserEntity;

  @Column({ type: 'timestamp', nullable: true })
  archived_at: Date;
  
}
