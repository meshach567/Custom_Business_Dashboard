// src/auth/users/user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  //OneToMany,
  BeforeInsert,
} from 'typeorm';
import { Sale } from '../../sales/entities/sale.entity';
import * as bcrypt from 'bcrypt';
import { IsEmail, IsNotEmpty, MinLength, IsIn } from 'class-validator';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @Column({ default: 'user' })
  @IsIn(['user', 'admin'])
  role: string;

  // @OneToMany(() => Sale, (sale) => sale.user)
  sales: Sale[];

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
}
