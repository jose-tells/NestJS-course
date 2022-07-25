import { PartialType, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsDate, IsMongoId, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateOrdersDto {
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty()
  readonly user: string;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  readonly date: Date;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  @Type(() => Types.ObjectId)
  readonly products: string[];
}

export class UpdateOrdersDto extends PartialType(CreateOrdersDto) {}

export class UpdateProductsFromOrderDto {
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty()
  readonly productId: string;
}
