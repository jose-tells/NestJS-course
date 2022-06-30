import { Controller, Get, Param } from '@nestjs/common';

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
