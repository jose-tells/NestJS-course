import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateBrandDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  image: string;
}
