import { Global, Module } from '@nestjs/common';
import { DeductionService } from './deduction.service';
import { DeductionController } from './deduction.controller';
import { deductionProviders } from './deduction.provider';
import { DatabaseModule } from 'src/database/database.module';

@Global()
@Module({
  imports: [DatabaseModule],
  controllers: [DeductionController],
  providers: [DeductionService, ...deductionProviders],
})
export class DeductionModule {}
