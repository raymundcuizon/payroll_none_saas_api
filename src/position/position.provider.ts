import { DataSource } from 'typeorm';
import { Position } from './entities/position.entity';

export const positionProvider = [
  {
    provide: 'POSITION_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Position),
    inject: ['DATA_SOURCE'],
  },
];
