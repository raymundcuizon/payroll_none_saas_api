import { DataSource } from 'typeorm';
import { Deduction } from './entities/deduction.entity';

export const deductionProviders = [
  {
    provide: 'DEDUCTION_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Deduction),
    inject: ['DATA_SOURCE'],
  },
];
