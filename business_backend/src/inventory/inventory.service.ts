// src/auth/inventory/inventory.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  create(dto: CreateProductDto): Promise<Product> {
    const product = this.productRepo.create(dto);
    return this.productRepo.save(product);
  }

  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    await this.productRepo.update(id, dto);
    return this.findOne(id);
  }

  findAll(query: {
    page?: number;
    limit?: number;
    name?: string;
  }): Promise<[Product[], number]> {
    const page = query.page && query.page > 0 ? query.page : 1;
    const limit = query.limit && query.limit > 0 ? query.limit : 10;
    const skip = (page - 1) * limit;

    const qb = this.productRepo.createQueryBuilder('product');

    if (query.name) {
      qb.where('product.name ILIKE :name', { name: `%${query.name}%` });
    }

    qb.skip(skip).take(limit);

    return qb.getManyAndCount();
  }

  findOne(id: string): Promise<Product | null> {
    return this.productRepo.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.productRepo.delete(id);
  }
}
