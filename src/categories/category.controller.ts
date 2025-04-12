import { Controller, Get, Query } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {

    constructor(private readonly categoryService:CategoryService) {
        
    }

    @Get()
    async getCategories(){
        return this.categoryService.getCategories();
    }

    @Get('by_category_id')
    async getCategoryById(
        @Query('category_id') category_id:string
    ){
        return this.categoryService.getCategoryById(Number(category_id));
    }
}
