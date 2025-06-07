// src/sales/sales.module.ts
import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { JwtStrategy } from '../auth/jwt.strategy'; // assuming auth folder is sibling
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sale]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [SalesController],
  providers: [SalesService, JwtStrategy],
})
export class SalesModule {}
