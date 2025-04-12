import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Controller('categories')
export class CategoryController {

    constructor(private readonly categoryService:CategoryService) {}

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

    @Post('createCategory')
    @ApiBody({type:CreateCategoryDto})
    async createCategory(@Body() dto:CreateCategoryDto){
        return this.categoryService.createCategory(dto);
    }

    @Delete('delete_category_by_category_id')
    async deleteCategory( 
        @Query('category_id') category_id: string
    ){
        return this.categoryService.deleteCategory(Number(category_id));
    }

    @Patch('update_category_by_id')
    @ApiBody({type:CreateCategoryDto})
    async updateCategory(
        @Query('category_id') category_id:string,
        @Body() dto:CreateCategoryDto){
        return this.categoryService.updateCategory(Number(category_id),dto);
    }
}
