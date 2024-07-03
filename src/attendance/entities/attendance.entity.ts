import { AbstractEntity } from 'src/database/abstract.entity';
import { Employee } from 'src/employee/entities/employee.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';

export enum ATTENDANCE_LOG_TYPE_ENUM {
  AM_IN = 'AM_IN',
  AM_OUT = 'AM_OUT',
  PM_IN = 'PM_IN',
  PM_OUT = 'PM_OUT',
}

export enum AttendanceStatus {
  PRESENT = 'present',
  ABSENT = 'absent',
  LEAVE = 'leave',
}

@Entity()
export class Attendance extends AbstractEntity<Attendance> {
  @ManyToOne(() => Employee, (employee) => employee.allowances)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column({ type: 'date', nullable: false })
  date: string;

  @Column({ type: 'time', nullable: false })
  time_in: string;

  @Column({ type: 'time', nullable: true })
  time_out: string;

  @Column({
    type: 'enum',
    enum: AttendanceStatus,
    default: AttendanceStatus.PRESENT,
    nullable: false,
  })
  status: AttendanceStatus;
}
