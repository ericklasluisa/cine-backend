import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class CreateAsientoDto {
  @IsInt()
  @Type(() => Number)
  rowNumber: number;

  @IsInt()
  @Type(() => Number)
  columnNumber: number;

  @IsString()
  status: string;

  @IsInt()
  @Type(() => Number)
  roomId: number;

  @IsInt()
  @Type(() => Number)
  moovieId: number;
}
