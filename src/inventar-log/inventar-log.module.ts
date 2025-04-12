import { Module } from '@nestjs/common';
import { InventarLogController } from './inventar-log.controller';
import { InventarLogService } from './inventar-log.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [InventarLogController],
  providers: [InventarLogService]
})
export class InventarLogModule {}
