import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { InventarLogsController } from './inventar-logs.controller';
import { InventarLogsService } from './inventar-logs.service';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [PrismaModule, ProductsModule],
  controllers: [InventarLogsController],
  providers: [InventarLogsService]
})
export class InventarLogsModule {}
