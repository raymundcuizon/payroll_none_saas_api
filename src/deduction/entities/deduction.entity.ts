import { Agency } from 'src/agency/entities/agency.entity';
import { AbstractEntity } from 'src/database/abstract.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';

@Entity()
export class Deduction extends AbstractEntity<Deduction> {
  @Column()
  name: string;

  @Column()
  agency_id: number;

  @Column({
    nullable: true,
    type: 'text',
  })
  description: string;

  @ManyToOne(() => Agency, (x) => x.allowances)
  @JoinColumn({ name: 'agency_id' })
  agency: Agency;

  //   @ManyToMany(() => Employee, (employee) => employee.allowances)
  //   employees: Employee[];
}
