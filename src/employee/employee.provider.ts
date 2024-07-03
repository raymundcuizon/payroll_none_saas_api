import { DataSource } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { EmployeeAllowance } from './entities/employee-allowance.entity';
import { EmployeeDeduction } from './entities/employee-deduction.entity';

export const employeeProvider = [
  {
    provide: 'EMPLOYEE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Employee),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'EMPLOYEE_ALLOWANCE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(EmployeeAllowance),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'EMPLOYEE_DEDUCTION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(EmployeeDeduction),
    inject: ['DATA_SOURCE'],
  },
];
