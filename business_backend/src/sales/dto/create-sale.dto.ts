// src/sales/dto/create-sale.dto.ts
import {
  IsString,
  IsInt,
  IsPositive,
  MinLength,
  IsNumber,
} from 'class-validator';

export class CreateSaleDto {
  @IsString()
  @MinLength(2)
  productName: string;

  @IsInt()
  @IsPositive()
  quantity: number;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsString()
  @MinLength(2)
  customerName: string;
}
