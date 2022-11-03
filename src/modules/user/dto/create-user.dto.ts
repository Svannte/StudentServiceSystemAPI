import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { roles } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  // @ApiProperty()
  // @IsNotEmpty()
  // @IsEnum(roles)
  // role: roles;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(6, 32)
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsOptional()
  lastName: string;
}
