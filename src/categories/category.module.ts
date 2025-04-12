import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { PrismaModule } from 'src/prisma/prisma.module'; 
import { S3Module } from 'src/s3/s3.module';

@Module({
  imports: [S3Module, PrismaModule],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
