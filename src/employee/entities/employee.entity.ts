import { Agency } from 'src/agency/entities/agency.entity';
import { Allowance } from 'src/allowance/entities/allowance.entity';
import { AbstractEntity } from 'src/database/abstract.entity';
import { Deduction } from 'src/deduction/entities/deduction.entity';
import { User } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Employee extends AbstractEntity<Employee> {
  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  agency_id: number;

  @ManyToOne(() => Agency, (x) => x.employees, { cascade: true })
  @JoinColumn({ name: 'agency_id' })
  agency: Agency;

  @Column({
    nullable: true,
  })
  user_id: number;

  @Column({
    nullable: false,
  })
  employee_no: string;

  @Column('decimal', { precision: 6, scale: 2 })
  salary: number;

  @OneToOne(() => User, (user) => user.employee)
  @JoinTable()
  user: User;

  // @ManyToMany(() => Allowance, (allowance) => allowance.employees)
  // allowances: Allowance[];

  // @ManyToMany(() => Deduction, (deduction) => deduction.employees)
  // deductions: Deduction[];
}
