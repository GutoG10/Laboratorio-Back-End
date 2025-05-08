import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'bool', default: false})
  archived: boolean;

  constructor(data?: Partial<BaseEntity>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
