import { Agency } from 'src/agency/entities/agency.entity';
import { AbstractEntity } from 'src/database/abstract.entity';
import { Department } from 'src/department/entities/department.entity';
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
export class Position extends AbstractEntity<Position> {
  @Column()
  name: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  description: string;

  @Column()
  agency_id: number;

  @ManyToOne(() => Agency, (agency) => agency.positions, { cascade: true })
  @JoinColumn({ name: 'agency_id' })
  agency: Agency;

  @Column()
  department_id: number;

  @ManyToOne(() => Department, (department) => department.positions, {
    cascade: true,
  })
  @JoinColumn({ name: 'department_id' })
  department: Department;
}
