import { AbstractEntity } from 'src/database/abstract.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payroll')
export class Payroll extends AbstractEntity<Payroll> {
  @Column({ type: 'text', nullable: false })
  ref_no: string;

  @Column({ type: 'date', nullable: false })
  date_from: Date;

  @Column({ type: 'date', nullable: false })
  date_to: Date;

  @Column({
    type: 'smallint',
    nullable: false,
    comment: '1 = monthly, 2 = semi-monthly',
  })
  type: number;

  @Column({
    type: 'smallint',
    nullable: false,
    default: 0,
    comment: '0 = New, 1 = computed',
  })
  status: number;
}
