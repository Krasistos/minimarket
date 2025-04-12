import { Injectable } from '@nestjs/common';
import { PrismaService} from '../prisma/prisma.service';

@Injectable()
export class CategoryService {

    constructor(private readonly prismaService: PrismaService) {}

    async getCategories(){
        return this.prismaService.category.findMany();
    }

    async getCategoryById(category_id:number){
        return this.prismaService.category.findUnique(
            {
                where: {category_id:category_id }
            }
        );
    }
}
