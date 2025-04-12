// src/product/dto/create-product.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  price: number;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  category_id: number;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: true,
  })
  image: any;
}
