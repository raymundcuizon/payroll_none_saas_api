import { DataSource } from 'typeorm';
import { Payroll } from './entities/payroll.entity';
import { PayrollItem } from './entities/payroll-items.entity';

export const payrollProvider = [
  {
    provide: 'PAYROLL_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Payroll),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'PAYROLL_ITEMS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(PayrollItem),
    inject: ['DATA_SOURCE'],
  },
];
