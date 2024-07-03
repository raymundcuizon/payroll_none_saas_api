import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { Employee } from './employee.entity';
import { Allowance } from 'src/allowance/entities/allowance.entity';
import { AbstractEntity } from 'src/database/abstract.entity';

@Entity()
export class EmployeeAllowance extends AbstractEntity<EmployeeAllowance> {
  @Column()
  employee_id: number;

  @ManyToOne(() => Employee, (employee) => employee.allowances)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column({
    type: 'smallint',
    width: 1,
    comment: '1 = Monthly, 2= Semi-Monthly, 3 = once',
  })
  type: number;

  @Column()
  allowance_id: number;

  @ManyToOne(() => Allowance, (allowance) => allowance.employees)
  @JoinColumn({ name: 'allowance_id' })
  allowance: Allowance;

  @Column('decimal', { precision: 6, scale: 2 })
  amount: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: null,
    nullable: true,
  })
  effective_date: Date;

  @Column({
    default: true,
  })
  is_active: boolean;
}
