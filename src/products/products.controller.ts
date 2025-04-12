import {
    Controller,
    Post,
    Get,
    Body,
    UploadedFile,
    UseInterceptors,
    Query,
    Delete,
    Patch,
} from '@nestjs/common';
import {
    ApiTags,
    ApiConsumes,
    ApiBody,
    ApiForbiddenResponse,
} from '@nestjs/swagger';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductsService } from './products.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Products')
@Controller('products')
//@ApiBearerAuth()
@ApiForbiddenResponse()
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    //  @UseGuards(AuthGuard)
    async getProducts() {
        return this.productsService.getProducts();
    }

    @Get('by_product_id')
    async getProductById(@Query('product_id') product_id: string) {
        return this.productsService.getProductById(Number(product_id));
    }

    @Post('createProduct')
    @UseInterceptors(FileInterceptor('image'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({ type: CreateProductDto })
    async createProduct(
        @UploadedFile() file: Express.Multer.File,
        @Body() dto: CreateProductDto,
    ) {
        return this.productsService.createProduct( file, dto);
    }

    @Delete('delete_product_by_product_id')
    async deleteProduct(@Query('product_id') product_id: string) {
        return this.productsService.deleteProduct(Number(product_id));
    }

    @Patch('update_product_by_id')
    @UseInterceptors(FileInterceptor('image'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({ type: CreateProductDto })
    async updateProduct(
        @Query('product_id') product_id: string,
        @UploadedFile() file: Express.Multer.File,
        @Body() dto: CreateProductDto
    ) { 
        return this.productsService.updateProduct(Number(product_id), file, dto);
    }
}
