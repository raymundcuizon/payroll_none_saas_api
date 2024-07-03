import { Agency } from 'src/agency/entities/agency.entity';
import { Allowance } from 'src/allowance/entities/allowance.entity';
import { Attendance } from 'src/attendance/entities/attendance.entity';
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
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { EmployeeDeduction } from './employee-deduction.entity';
import { EmployeeAllowance } from './employee-allowance.entity';

export enum USER_GENDER_ENUM {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHERS = 'OTHERS',
}
@Entity()
export class Employee extends AbstractEntity<Employee> {
  @Column({
    nullable: false,
  })
  employee_no: string;

  @Column('decimal', { precision: 10, scale: 2 })
  salary: number;

  @Column()
  given_name: string;

  @Column()
  family_name: string;

  @Column({
    nullable: true,
  })
  middle_name: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column({
    type: 'enum',
    enum: USER_GENDER_ENUM,
    nullable: true,
    default: USER_GENDER_ENUM.OTHERS,
  })
  gender: string;

  @Column({ nullable: true })
  birthdate: string;

  @Column({ nullable: true })
  address: string;

  @OneToMany(() => EmployeeAllowance, (allowance) => allowance.employee)
  @JoinTable()
  allowances: EmployeeAllowance[];

  @OneToMany(() => EmployeeDeduction, (deduction) => deduction.employee)
  @JoinTable()
  deductions: EmployeeDeduction[];

  @OneToMany(() => Attendance, (deduction) => deduction.employee)
  @JoinTable()
  attendance: Attendance[];

  @Column({
    nullable: true,
  })
  user_id: number;

  @OneToOne(() => User, (user) => user.employee)
  @JoinTable()
  user: User;

  @Column({
    nullable: true,
  })
  agency_id: number;

  @ManyToOne(() => Agency, (x) => x.employees, { cascade: true })
  @JoinColumn({ name: 'agency_id' })
  agency: Agency;
}
