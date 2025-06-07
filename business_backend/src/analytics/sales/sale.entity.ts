// src/auth/sales/sale.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  productName: string;

  @Column('decimal', { precision: 10, scale: 2 })
  @IsNumber()
  @Min(0)
  amount: number;

  @Column()
  @IsNumber()
  @Min(1)
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.sales, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: User;
}
