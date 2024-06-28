import { Allowance } from 'src/allowance/entities/allowance.entity';
import { AbstractEntity } from 'src/database/abstract.entity';
import { Deduction } from 'src/deduction/entities/deduction.entity';
import { Department } from 'src/department/entities/department.entity';
import { Employee } from 'src/employee/entities/employee.entity';
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

  @OneToMany(() => Department, (x) => x.agency)
  departments: Department[];

  @OneToMany(() => Position, (x) => x.agency)
  positions: Position[];

  @OneToMany(() => Allowance, (x) => x.agency)
  allowances: Allowance[];

  @OneToMany(() => Deduction, (x) => x.agency)
  deductions: Deduction[];

  @OneToMany(() => Employee, (x) => x.agency)
  employees: Employee[];
}
