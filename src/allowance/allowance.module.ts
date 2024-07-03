import { Global, Module } from '@nestjs/common';
import { AllowanceService } from './allowance.service';
import { AllowanceController } from './allowance.controller';
import { allowanceProviders } from './allowance.provider';
import { DatabaseModule } from 'src/database/database.module';

@Global()
@Module({
  imports: [DatabaseModule],
  controllers: [AllowanceController],
  providers: [AllowanceService, ...allowanceProviders],
  exports: [AllowanceService],
})
export class AllowanceModule {}
