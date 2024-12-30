import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateAsientoDto } from './dto/create-asiento.dto';
import { UpdateAsientoDto } from './dto/update-asiento.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AsientosService extends PrismaService implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  create(createAsientoDto: CreateAsientoDto) {
    return this.seat.create({
      data: {
        rowNumber: createAsientoDto.rowNumber,
        columnNumber: createAsientoDto.columnNumber,
        status: createAsientoDto.status,
        room: {
          connect: { id: createAsientoDto.roomId },
        },
        movie: {
          connect: { id: createAsientoDto.moovieId },
        },
      },
    });
  }

  findAll() {
    return this.seat.findMany();
  }

  findAllByMovieId(movieId: number) {
    return this.seat.findMany({
      where: { movieId },
    });
  }

  update(id: number, updateAsientoDto: UpdateAsientoDto) {
    return this.seat.update({
      where: { id },
      data: {
        rowNumber: updateAsientoDto.rowNumber,
        columnNumber: updateAsientoDto.columnNumber,
        status: updateAsientoDto.status,
        room: {
          connect: { id: updateAsientoDto.roomId },
        },
        movie: {
          connect: { id: updateAsientoDto.moovieId },
        },
      },
    });
  }

  remove(id: number) {
    return this.seat.delete({
      where: { id },
    });
  }
}
