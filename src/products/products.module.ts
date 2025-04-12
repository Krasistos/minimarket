import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { PrismaModule } from '../prisma/prisma.module';
import { S3Module } from 'src/s3/s3.module';

@Module({
  imports: [S3Module, PrismaModule],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService] 
})
export class ProductsModule {}