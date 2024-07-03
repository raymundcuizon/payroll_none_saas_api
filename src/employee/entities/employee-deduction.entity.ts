import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { Employee } from './employee.entity';
import { AbstractEntity } from 'src/database/abstract.entity';
import { Deduction } from 'src/deduction/entities/deduction.entity';

@Entity()
export class EmployeeDeduction extends AbstractEntity<EmployeeDeduction> {
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
  deduction_id: number;

  @ManyToOne(() => Deduction, (deduction) => deduction.deductions)
  @JoinColumn({ name: 'deduction_id' })
  deduction: Deduction;

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
