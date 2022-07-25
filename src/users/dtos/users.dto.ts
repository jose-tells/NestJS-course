import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateSkillsDto } from './skills.dto';

export class CreateUsersDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: "User's email" })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly role: 'admin' | 'client';

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateSkillsDto)
  readonly skills: CreateSkillsDto[];
}

export class UpdateUsersDto extends PartialType(CreateUsersDto) {}
