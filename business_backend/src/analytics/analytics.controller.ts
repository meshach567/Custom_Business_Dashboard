// src/auth/analytics/analytics.controller.ts
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Roles('admin')
  @Get('sales-summary')
  getSalesSummary(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.analyticsService.getSalesSummary(startDate, endDate);
  }

  @Get('sales-summary/chart-data')
  getSalesChartData(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.analyticsService.getSalesChartData(startDate, endDate);
  }

  @Roles('admin')
  @Get('inventory-status')
  getInventoryStatus() {
    return this.analyticsService.getInventoryStatus();
  }
}
