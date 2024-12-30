import { IsInt, IsString } from 'class-validator';

export class CreateSalaDto {
  @IsString()
  name: string;
  @IsInt()
  rows: number;
  @IsInt()
  columns: number;
}
