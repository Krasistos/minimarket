import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService} from '../prisma/prisma.service';
import { CreateCategoryDto } from './dtos/create-category.dto';

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

    async createCategory(data: CreateCategoryDto){
        return this.prismaService.category.create({data:{ name:data.name} });
    }

    async deleteCategory(category_id: number){
        let category = await this.getCategoryById(category_id);
        if(!category){
            throw new HttpException('category not found', HttpStatus.INTERNAL_SERVER_ERROR)
        }

        return this.prismaService.category.delete({where:{category_id}});
    }

    async updateCategory(category_id:number,data:CreateCategoryDto){
        let category = await this.getCategoryById(category_id);

        if(!category){
            throw new HttpException('No category with this id',HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return this.prismaService.category.update({
            where:{category_id:category_id},
            data:{
                name:data.name,
            }
        });
    }
}
