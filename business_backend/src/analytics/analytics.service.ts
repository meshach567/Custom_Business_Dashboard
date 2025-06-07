// src/auth/analytics/analytics.service.ts
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from '../sales/entities/sale.entity';
import { Product } from '../inventory/entities/product.entity';
import { Between, Repository } from 'typeorm';
import {
  calculateSalesSummary,
  calculateInventoryStatus,
} from './analytics.utils';
import * as dayjs from 'dayjs';
import { groupBy } from 'lodash';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Sale)
    private salesRepo: Repository<Sale>,

    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  async getSalesChartData(startDate?: string, endDate?: string) {
    const where = {};

    if (startDate && endDate) {
      Object.assign(where, {
        createdAt: Between(new Date(startDate), new Date(endDate)),
      });
    }

    const sales = await this.salesRepo.find({
      where,
      order: { createdAt: 'ASC' },
    });

    // Group sales by date (YYYY-MM-DD) for chart data
    const chartData = sales.reduce(
      (acc, sale) => {
        const dateKey = sale.createdAt.toISOString().split('T')[0];
        acc[dateKey] = (acc[dateKey] || 0) + sale.price;
        return acc;
      },
      {} as Record<string, number>,
    );

    return chartData;
  }

  async getSalesSummary(startDate?: string, endDate?: string) {
    const query = this.salesRepo.createQueryBuilder('sale');

    if (startDate) {
      query.andWhere('sale.createdAt >= :startDate', { startDate });
    }
    if (endDate) {
      query.andWhere('sale.createdAt <= :endDate', { endDate });
    }

    const sales = await query.getMany();
    const grouped = groupBy(sales, (s) =>
      dayjs(s.createdAt).format('YYYY-MM-DD'),
    );

    const labels = Object.keys(grouped).sort();
    const data = labels.map((date) =>
      grouped[date].reduce((sum, s) => sum + s.price, 0),
    );

    return {
      labels,
      datasets: [
        {
          label: 'Sales Revenue',
          data,
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
      ],
    };
    // return calculateSalesSummary(sales);
  }

  async getInventoryStatus() {
    const products = await this.productRepo.find();
    return calculateInventoryStatus(products);
  }

  @Cron('0 0 * * *') // every day at midnight
  async handleDailySalesAggregation() {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const sales = await this.salesRepo
      .createQueryBuilder('sale')
      .where('sale.createdAt BETWEEN :start AND :end', {
        start: yesterday.toISOString(),
        end: today.toISOString(),
      })
      .getMany();

    const summary = calculateSalesSummary(sales);
    console.log('[Analytics] Daily summary:', summary);
  }
}
