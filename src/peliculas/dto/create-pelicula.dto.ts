import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class CreatePeliculaDto {
  @IsString()
  public title: string;

  @IsInt()
  @Type(() => Number)
  public roomId: number;

  @IsString()
  public imgUrl: string;
}
