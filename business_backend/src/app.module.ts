import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SalesModule } from './sales/sales.module';
import { InventoryModule } from './inventory/inventory.module';
import { InventoryService } from './inventory/inventory.service';
import { AnalyticsModule } from './analytics/analytics.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeOrmConfigAsync),
    AuthModule,
    UsersModule,
    SalesModule,
    InventoryModule,
    AnalyticsModule,
  ],
  controllers: [AppController],
  providers: [AppService, InventoryService],
})
export class AppModule {}
