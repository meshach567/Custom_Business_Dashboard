// src/auth/analytics/analytics.module.ts
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from '../sales/entities/sale.entity';
import { Product } from '../inventory/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sale, Product]),
    ScheduleModule.forRoot(),
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
