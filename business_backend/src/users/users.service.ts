// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.usersRepo.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.usersRepo.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepo.findOne({ where: { email } });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepo.find();
  }
}
