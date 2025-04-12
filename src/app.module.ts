import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { S3Service } from './s3/s3.service';
import { S3Module } from './s3/s3.module';
import { CategoriesModule } from './categories/categories.module';
import { InventarLogsModule } from './inventar-logs/inventar-logs.module';

@Module({
  imports: [ProductsModule, PrismaModule, CategoriesModule, InventarLogsModule, S3Module],
  controllers: [AppController],
  providers: [AppService, PrismaService, S3Service],
})
export class AppModule {}
