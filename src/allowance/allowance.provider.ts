import { DataSource } from 'typeorm';
import { Allowance } from './entities/allowance.entity';

export const allowanceProviders = [
  {
    provide: 'ALLOWANCE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Allowance),
    inject: ['DATA_SOURCE'],
  },
];
