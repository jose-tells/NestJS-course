import { IsOptional, IsPositive, Min, ValidateIf } from 'class-validator';

export class FilterQueryDto {
  @IsOptional()
  @IsPositive()
  readonly limit: number;

  @IsOptional()
  @Min(0)
  readonly offset: number;

  @IsOptional()
  @Min(0)
  readonly minPrice: number;

  @ValidateIf((params) => params.minPrice)
  @IsPositive()
  readonly maxPrice: number;
}
