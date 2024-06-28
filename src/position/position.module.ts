import { Global, Module } from '@nestjs/common';
import { PositionService } from './position.service';
import { PositionController } from './position.controller';
import { positionProvider } from './position.provider';
import { DatabaseModule } from 'src/database/database.module';

@Global()
@Module({
  imports: [DatabaseModule],
  controllers: [PositionController],
  providers: [PositionService, ...positionProvider],
})
export class PositionModule {}
