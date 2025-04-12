import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { S3Service } from 'src/s3/s3.service';

@Injectable()
export class ProductsService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly s3Service: S3Service,
    ) { }


    async getProducts() {
        return this.prismaService.product.findMany();
    }

    async getProductById(product_id: number) {
        return this.prismaService.product.findUnique(
            {
                where: { product_id: product_id, }
            }
        );
    }

    async createProduct(file: Express.Multer.File,data: CreateProductDto) {
        
        let category = await this.prismaService.category.findUnique(
            {where:{category_id:Number(data.category_id)}}
        );

        if(!category){
            throw new Error('no category with this id');
        }
        
        const ext = file.originalname.split('.').pop();
        const key = `products/${Date.now()}.${ext}`;
        let img_url = await this.s3Service.uploadFile(
            key,
            file.buffer,
            file.mimetype,
        );
        if(!img_url){
            throw new Error('the uploading was not successfull and the img_url is null');
        }

        return this.prismaService.product.create({
            data: {
                name: data.name,
                quantity: Number(data.quantity),
                price: Number(data.price),
                description: data.description,
                category_id: Number(data.category_id),
                img_url: img_url,
            }
        });
    }

    async deleteProduct(product_id: number) {
        const product = await this.prismaService.product.findUnique({
            where: { product_id: product_id },
        });

        if (!product) {
            throw new Error('Product not found');
        }

        let partsOfImgUrl = product.img_url?.split('/');
        console.log(partsOfImgUrl);

        if (!partsOfImgUrl) {
            throw new Error('Img url is null or undefined');
        }

        const filePath = `products/${partsOfImgUrl[partsOfImgUrl?.length - 1]}`;
        console.log("FILE PATH:" + filePath);

        if (filePath) {
            await this.s3Service.deleteFile(filePath);
            await this.prismaService.product.delete({
                where: { product_id },
            });

            return { message: 'Product and image deleted successfully' };
        }
        else {
            throw new Error('Product and image deletion not successfull probably due to img_url being null');
        }
    }

    async updateProduct(product_id: number,file:Express.Multer.File, data:CreateProductDto) {

        const product = await this.prismaService.product.findUnique({
            where: { product_id: product_id },
        });

        let category = await this.prismaService.category.findUnique(
            {where:{category_id:Number(data.category_id)}}
        );

        if(!category){
            // throw new Error('no category with this id');
            throw new HttpException('No category with this id', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (!product) {
            throw new HttpException(' product not found', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        let img_url = product.img_url;

        let partsOfImgUrl = product.img_url?.split('/');
        console.log(partsOfImgUrl);

        if (!partsOfImgUrl) {
            throw new HttpException('Img url is null or undefined', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        const filePath = `products/${partsOfImgUrl[partsOfImgUrl?.length - 1]}`;
        console.log("FILE PATH:" + filePath);

        if (filePath) {
            await this.s3Service.deleteFile(filePath);

            const ext = file.originalname.split('.').pop();
            const key = `products/${Date.now()}.${ext}`;
            img_url = await this.s3Service.uploadFile(
                key,
                file.buffer,
                file.mimetype,
            );
            
            return this.prismaService.product.update({
                where: { product_id: product_id },
                data: {
                    name: data.name,
                    quantity: Number(data.quantity),
                    price: Number(data.price),
                    description: data.description,
                    category_id: Number(data.category_id),
                    img_url: img_url,
                }
            });
        }
        else{
            throw new HttpException('wrong file', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
