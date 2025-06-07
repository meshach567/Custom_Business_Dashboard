// src/sales/sales.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';
import { CreateSaleDto } from './dto/create-sale.dto';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private salesRepository: Repository<Sale>,
  ) {}

  create(createSaleDto: CreateSaleDto): Promise<Sale> {
    const sale = this.salesRepository.create(createSaleDto);
    return this.salesRepository.save(sale);
  }

  findAll({
    page,
    limit,
    product,
  }: {
    page?: string;
    limit?: string;
    product?: string;
  }) {
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;

    //const query = this.salesRepository.createQueryBuilder('sale');

    // if (options.product) {
    //   query.where('sale.productName ILIKE :product', {
    //     product: `%${options.product}%`,
    //   });
    // }

    return this.salesRepository.find({
      where: product ? { productName: product } : {},
      skip: (pageNum - 1) * limitNum,
      take: limitNum,
    });
    // return query
    //   .orderBy('sale.createdAt', 'DESC')
    //   .skip(skip)
    //   .take(limit)
    //   .getManyAndCount();
  }

  findOne(id: string): Promise<Sale | null> {
    return this.salesRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.salesRepository.delete(id);
  }
}
