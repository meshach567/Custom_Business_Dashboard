// src/auth/inventory/inventory.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UseGuards,
  Patch,
  Query,
} from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { InventoryService } from './inventory.service';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('inventory')
@UseGuards(JwtAuthGuard, RolesGuard)
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Roles('admin')
  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.inventoryService.create(dto);
  }

  //   @Get()
  //   async findAll(
  //     @Query('page') page?: number,
  //     @Query('limit') limit?: number,
  //     @Query('name') name?: string,
  //   ) {
  //     const [data, total] = await this.inventoryService.findAll({
  //       page,
  //       limit,
  //       name,
  //     });
  //     return {
  //       data,
  //       meta: {
  //         total,
  //         page: +page || 1,
  //         limit: +limit || 10,
  //         totalPages: Math.ceil(total / (+limit || 10)),
  //       },
  //     };
  //   }
  @Get()
  findAll(@Query() query) {
    return this.inventoryService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventoryService.findOne(id);
  }

  @Roles('admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.inventoryService.update(id, dto);
  }

  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventoryService.remove(id);
  }
}
