import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  @Get()
  getBrands() {
    return `Brands page`;
  }

  @Get(':brandName')
  getBrandsByName(@Param('brandName') brandName: string) {
    return `This is ${brandName} page`;
  }
}
