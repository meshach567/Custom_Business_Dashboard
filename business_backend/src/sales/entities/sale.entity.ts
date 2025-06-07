// src/sales/entities/sale.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  productName: string;

  @Column('int')
  quantity: number;

  @Column('decimal')
  price: number;

  @Column()
  customerName: string;

  @CreateDateColumn()
  createdAt: Date;
}
