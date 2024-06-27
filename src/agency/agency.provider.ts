import { DataSource } from 'typeorm';
import { Agency } from './entities/agency.entity';

export const agencyProviders = [
  {
    provide: 'AGENCY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Agency),
    inject: ['DATA_SOURCE'],
  },
];
