// products.controller.ts
import {
    Controller,
    Post,
    Get,
    Body,
    UploadedFile,
    UseInterceptors,
    UseGuards,
    Query,
    Delete,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiConsumes,
    ApiBody,
    ApiResponse,
    ApiBearerAuth,
    ApiForbiddenResponse,
} from '@nestjs/swagger';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { S3Service } from 'src/s3/s3.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Products')
@Controller('products')
//@ApiBearerAuth()
@ApiForbiddenResponse()
export class ProductsController {
    constructor(private readonly productsService: ProductsService
        , private readonly s3Service: S3Service) { }

    @Get()
    //  @UseGuards(AuthGuard)
    async getProducts() {
        return this.productsService.getProducts();
    }
    @Get('first')
    async getFirstProduct() {
        return this.productsService.getFirstProduct();
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
        const ext = file.originalname.split('.').pop();
        const key = `products/${Date.now()}.${ext}`;
        const img_url = await this.s3Service.uploadFile(
            key,
            file.buffer,
            file.mimetype,
        );

        return this.productsService.createProduct({
            ...dto,
            img_url,
        });
    }

    @Delete('by_product_id')
    async deleteProduct(@Query('product_id') product_id: string) {
        return this.productsService.deleteProduct(Number(product_id));
    }
}
