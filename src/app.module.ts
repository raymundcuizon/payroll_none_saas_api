import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './config.schema';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AgencyModule } from './agency/agency.module';
import { DepartmentModule } from './department/department.module';
import { EmployeeModule } from './employee/employee.module';
import { PositionModule } from './position/position.module';
import { AllowanceModule } from './allowance/allowance.module';
import { DeductionModule } from './deduction/deduction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`stage.${process.env.STAGE}.env`],
      validationSchema: configValidationSchema,
      isGlobal: true,
      cache: true,
    }),
    AuthModule,
    UsersModule,
    AgencyModule,
    DepartmentModule,
    EmployeeModule,
    PositionModule,
    AllowanceModule,
    DeductionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
