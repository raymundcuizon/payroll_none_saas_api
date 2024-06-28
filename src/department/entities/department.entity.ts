import { Agency } from 'src/agency/entities/agency.entity';
import { AbstractEntity } from 'src/database/abstract.entity';
import { Position } from 'src/position/entities/position.entity';
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
export class Department extends AbstractEntity<Department> {
  @Column()
  name: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  description: string;

  @Column()
  agency_id: number;

  @ManyToOne(() => Agency, (agency) => agency.departments, { cascade: true })
  @JoinColumn({ name: 'agency_id' })
  agency: Agency;

  @OneToMany(() => Position, (position) => position.department)
  positions: Position[];
}
