import { AbstractEntity } from 'src/database/abstract.entity';
import {
  Entity,
  Column,
  Unique,
  OneToMany,
  ManyToMany,
  JoinTable,
  UpdateDateColumn,
  Generated,
  Index,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity()
@Unique(['slug', 'name'])
export class Agency extends AbstractEntity<Agency> {
  @Column()
  name: string;

  @Column()
  slug: string;

  @Column()
  address: string;

  @Column()
  contact_number: string;
}
