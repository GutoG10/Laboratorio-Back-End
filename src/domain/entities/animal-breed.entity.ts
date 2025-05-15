import { BaseEntity } from 'src/infrastructure/database/base';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { AnimalSpecieEntity } from 'src/domain/entities';

@Entity('animal_breed')
export class AnimalBreedEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'uuid' })
  animal_specie_id: string;

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

  @ManyToOne(() => AnimalSpecieEntity)
  @JoinColumn([{ name: 'animal_specie_id', referencedColumnName: 'id' }])
  animalSpecie: AnimalSpecieEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn([{ name: 'created_by', referencedColumnName: 'id' }])
  createdBy: UserEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn([{ name: 'edited_by', referencedColumnName: 'id' }])
  editedBy: UserEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn([{ name: 'archived_by', referencedColumnName: 'id' }])
  archivedBy: UserEntity;
}
