import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDepartmentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly address?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly city?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly postalCode?: string;
}
