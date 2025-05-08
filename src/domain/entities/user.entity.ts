import { Column, Entity } from 'typeorm';
import { BaseEntity } from 'src/infrastructure/database/base';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100})
  last_name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;
}
