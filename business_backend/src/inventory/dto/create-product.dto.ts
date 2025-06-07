// src/auth/inventory/dto/create-product.dto.ts
import {
  IsString,
  IsOptional,
  IsNumber,
  IsInt,
  IsPositive,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsInt()
  @IsPositive()
  quantity: number;
}
