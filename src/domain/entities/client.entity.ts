import { BaseEntity } from 'src/infrastructure/database/base';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from 'src/domain/entities';

@Entity('client')
export class ClientEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 11 })
  phone: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @Column({ type: 'uuid' })
  created_by: string;

  @Column({ type: 'uuid', nullable: true })
  edited_by: string;

  @Column({ type: 'timestamp', nullable: true })
  edited_at: Date;

  @Column({ type: 'uuid', nullable: true })
  archived_by: string;

  @Column({ type: 'timestamp', nullable: true })
  archived_at: Date;

  @ManyToOne(() => UserEntity)
  @JoinColumn([{ name: 'created_by', referencedColumnName: 'id' }])
  UserCreator: UserEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn([{ name: 'edited_by', referencedColumnName: 'id' }])
  UserEditor: UserEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn([{ name: 'archived_by', referencedColumnName: 'id' }])
  UserArchived: UserEntity;
}
