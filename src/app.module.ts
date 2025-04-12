import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';
import { InventarLogModule } from './inventar-log/inventar-log.module';
import { S3Service } from './s3/s3.service';
import { S3Module } from './s3/s3.module';
import { TestController } from './test/test.controller';

@Module({
  imports: [ProductsModule, PrismaModule, CategoryModule, InventarLogModule, S3Module],
  controllers: [AppController, TestController],
  providers: [AppService, PrismaService, S3Service],
})
export class AppModule {}
