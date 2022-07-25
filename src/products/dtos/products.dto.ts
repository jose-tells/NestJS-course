import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsPositive,
  IsUrl,
  ValidateNested,
  IsMongoId,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

import { CreateCategoryDto } from './category.dto';

export class CreateProductsDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  readonly image: string;

  @ValidateNested()
  @IsNotEmpty()
  @ApiProperty()
  readonly category: CreateCategoryDto;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  readonly brand: string;
}

export class UpdateProductsDto extends PartialType(CreateProductsDto) {}
