import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { employeeProvider } from './employee.provider';
import { DatabaseModule } from 'src/database/database.module';
import { agencyProviders } from 'src/agency/agency.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [EmployeeController],
  providers: [EmployeeService, ...employeeProvider, ...agencyProviders],
})
export class EmployeeModule {}
