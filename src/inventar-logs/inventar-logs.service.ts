import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInventarLogDto } from './dtos/create-inventar-log.dto';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class InventarLogsService {

    constructor(private readonly prismaService:PrismaService,
        private readonly productService:ProductsService,
    ) {
        
    }

    async getInventarLogs(){
        return this.prismaService.inventarLog.findMany();
    }

    async getInventarLogById(log_id: number) {
        return this.prismaService.inventarLog.findUnique(
            {
                where: { log_id: log_id}
            }
        );
    }

    async createInventarLog(data: CreateInventarLogDto){
        let product = await this.productService.getProductById(Number(data.product_id));

        if(!product){
            throw new HttpException(' ther is no product with this id', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if(data.type != 'ORDERS' && data.type != 'SELLS'){
            throw new HttpException('wrong type', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if(data.type == 'ORDERS'){
            // the quantity of the product inside the db should increase by the given amount
            await this.prismaService.product.update({
                where: { product_id: product.product_id },
                data: {
                    name: product.name,
                    quantity: Number(product.quantity + data.quantity),
                    price: Number(product.price),
                    description: product.description,
                    category_id: Number(product.category_id),
                    img_url: product.img_url,
                }
            });
        }else if (data.type == 'SELLS'){
            // the quantity of the product inside the db should descrease by the given amount
            await this.prismaService.product.update({
                where: { product_id: product.product_id },
                data: {
                    name: product.name,
                    quantity: Number(product.quantity - data.quantity) <0 ? 0:Number(product.quantity-data.quantity),
                    price: Number(product.price),
                    description: product.description,
                    category_id: Number(product.category_id),
                    img_url: product.img_url,
                }
            });
        }


        return this.prismaService.inventarLog.create({
            data:{
                product_id:data.product_id,
                quantity:data.quantity,
                type:data.type,
                created_at: new Date(),
                updated_at: new Date(),
            }
        })
    }
}
