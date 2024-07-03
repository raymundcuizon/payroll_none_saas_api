import { Global, Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { departmentProviders } from './department.provider';
import { DatabaseModule } from 'src/database/database.module';

@Global()
@Module({
  imports: [DatabaseModule],
  controllers: [DepartmentController],
  providers: [DepartmentService, ...departmentProviders],
})
export class DepartmentModule {}
