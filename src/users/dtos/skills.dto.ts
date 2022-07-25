import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSkillsDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly color: string;
}
