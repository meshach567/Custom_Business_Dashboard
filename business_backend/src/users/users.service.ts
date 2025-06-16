// src/users/users.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserQueryParams } from './types/user-query-params.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  // async create(createUserDto: CreateUserDto): Promise<User> {
  //   const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
  //   const user = this.usersRepo.create({
  //     ...createUserDto,
  //     password: hashedPassword,
  //   });
  //   return this.usersRepo.save(user);
  // }

  async create(createUserDto: CreateUserDto) {
    const saltRounds = 10;

    const existingUser = await this.usersRepo.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    if (!createUserDto.password) {
      throw new Error('Password is required');
    }

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltRounds,
    );

    const user = this.usersRepo.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.usersRepo.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepo.findOne({ where: { email } });
  }

  // async findAll(): Promise<User[]> {
  //   return this.usersRepo.find();
  // }

  async findAll(query?: UserQueryParams) {
    const { page = 1, limit = 10, role } = query || {};

    const where = role ? { role } : {};
    const [data, total] = await this.usersRepo.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      total,
      page,
      limit,
    };
  }
  async findOne(id: string): Promise<User> {
    return this.usersRepo.findOneBy({ id });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.usersRepo.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepo.delete(id);
  }
}
