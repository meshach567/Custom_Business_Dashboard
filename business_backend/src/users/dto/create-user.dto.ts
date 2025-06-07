// src/users/dto/create-user.dto.ts
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsIn,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsIn(['user', 'admin'])
  role?: 'user' | 'admin';
}
