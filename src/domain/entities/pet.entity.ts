import { BaseEntity } from 'src/infrastructure/database/base';
import {
  Column,
  CreateDateColumn,
  Decimal128,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { AnimalBreedEntity, AnimalSpecieEntity, ClientEntity } from 'src/domain/entities';

@Entity('pet')
export class PetEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'uuid' })
  client_id: string;

  @Column({ type: 'uuid' })
  animal_specie_id: string;

  @Column({ type: 'uuid', nullable: true })
  animal_breed_id: string;

  @Column({ type: 'date', nullable: true })
  birth_date: Date;

  @Column({ type: 'numeric', nullable: true })
  peso: Decimal128;

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

  @ManyToOne(() => AnimalBreedEntity)
  @JoinColumn([{ name: 'animal_breed_id', referencedColumnName: 'id' }])
  animalBreed: AnimalBreedEntity;

  @ManyToOne(() => AnimalSpecieEntity)
  @JoinColumn([{ name: 'animal_specie_id', referencedColumnName: 'id' }])
  animalSpecie: AnimalSpecieEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn([{ name: 'archived_by', referencedColumnName: 'id' }])
  archivedBy: UserEntity;

  @ManyToOne(() => ClientEntity)
  @JoinColumn([{ name: 'client_id', referencedColumnName: 'id' }])
  client: ClientEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn([{ name: 'created_by', referencedColumnName: 'id' }])
  createdBy: UserEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn([{ name: 'edited_by', referencedColumnName: 'id' }])
  editedBy: UserEntity;
}
