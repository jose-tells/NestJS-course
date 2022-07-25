import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  image: string;
}
