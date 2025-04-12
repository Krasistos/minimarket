import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { S3Service } from 'src/s3/s3.service';
import { stringify } from 'querystring';

@Injectable()
export class ProductsService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly s3Service: S3Service,
    ) { }


    async getProducts() {
        return this.prismaService.product.findMany();
    }

    async getFirstProduct() {
        return this.prismaService.product.findFirst();
    }

    async getProductById(product_id: number) {
        return this.prismaService.product.findUnique(
            {
                where: { product_id: product_id, }
            }
        );
    }

    async createProduct(data: {
        name: string;
        quantity: number;
        price: number;
        description?: string;
        category_id: number;
        img_url: string;
    }) {
        return this.prismaService.product.create({
            data: {
                name: data.name,
                quantity: Number(data.quantity),
                price: Number(data.price),
                description: data.description,
                category_id: Number(data.category_id),
                img_url: data.img_url
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

        if (!product) {
            throw new Error('Product not found');
        }
        let img_url = product.img_url;

        let partsOfImgUrl = product.img_url?.split('/');
        console.log(partsOfImgUrl);

        if (!partsOfImgUrl) {
            throw new Error('Img url is null or undefined');
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
            throw new Error('wrong file')
        }
    }

}
