// sales/dto/filter-sale.dto.ts
import { IsOptional, IsString, IsNumberString } from 'class-validator';

export class FilterSaleDto {
  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;

  @IsOptional()
  @IsString()
  product?: string;
}
