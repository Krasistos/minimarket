import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { PrismaModule } from 'src/prisma/prisma.module'; 
import { S3Module } from 'src/s3/s3.module';

@Module({
  imports: [S3Module, PrismaModule],
  controllers: [CategoriesController],
  providers: [CategoriesService]
})
export class CategoriesModule {}
