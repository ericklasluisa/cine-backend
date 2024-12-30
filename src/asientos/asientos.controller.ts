import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AsientosService } from './asientos.service';
import { CreateAsientoDto } from './dto/create-asiento.dto';
import { UpdateAsientoDto } from './dto/update-asiento.dto';

@Controller('asientos')
export class AsientosController {
  constructor(private readonly asientosService: AsientosService) {}

  @Post()
  create(@Body() createAsientoDto: CreateAsientoDto) {
    return this.asientosService.create(createAsientoDto);
  }

  @Get()
  findAll() {
    return this.asientosService.findAll();
  }

  @Get(':movieId')
  findOne(@Param('movieId') movieId: string) {
    return this.asientosService.findAllByMovieId(+movieId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAsientoDto: UpdateAsientoDto) {
    return this.asientosService.update(+id, updateAsientoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.asientosService.remove(+id);
  }
}
