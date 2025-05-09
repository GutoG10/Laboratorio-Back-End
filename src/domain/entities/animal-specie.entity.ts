import { BaseEntity } from 'src/infrastructure/database/base';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from 'src/domain/entities';

@Entity('animal_specie')
export class AnimalSpecieEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

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
