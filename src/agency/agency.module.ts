import { Global, Module } from '@nestjs/common';
import { AgencyService } from './agency.service';
import { AgencyController } from './agency.controller';
import { agencyProviders } from './agency.provider';
import { DatabaseModule } from 'src/database/database.module';

@Global()
@Module({
  imports: [DatabaseModule],
  controllers: [AgencyController],
  providers: [AgencyService, ...agencyProviders],
})
export class AgencyModule {}
