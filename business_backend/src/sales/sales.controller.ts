// src/sales/sales.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { FilterSaleDto } from './dto/filter-sale.dto';

@Controller('sales')
@UseGuards(JwtAuthGuard, RolesGuard) // Protect all routes with JWT
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  create(@Body() createSaleDto: CreateSaleDto) {
    return this.salesService.create(createSaleDto);
  }

  // @Get()
  // findAll(
  //   @Query('page') page?: number,
  //   @Query('limit') limit?: number,
  //   @Query('product') product?: string,
  // ) {
  //   return this.salesService.findAll(page, limit, product);
  // }

  @Get()
  findAll(@Query() query: FilterSaleDto) {
    return this.salesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salesService.findOne(id);
  }

  @Roles('admin') // Only allow admins to delete sales
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salesService.remove(id);
  }
}
