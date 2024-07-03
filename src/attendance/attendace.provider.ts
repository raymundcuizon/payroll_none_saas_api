import { DataSource } from 'typeorm';
import { Attendance } from './entities/attendance.entity';

export const attendanceProvider = [
  {
    provide: 'ATTENDANCE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Attendance),
    inject: ['DATA_SOURCE'],
  },
];
