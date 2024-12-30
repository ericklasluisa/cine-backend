import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreatePeliculaDto } from './dto/create-pelicula.dto';
import { UpdatePeliculaDto } from './dto/update-pelicula.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PeliculasService extends PrismaService implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async create(createPeliculaDto: CreatePeliculaDto) {
    const pelicula = await this.movie.create({
      data: {
        title: createPeliculaDto.title,
        imgUrl: createPeliculaDto.imgUrl,
        room: {
          connect: { id: createPeliculaDto.roomId },
        },
      },
    });

    const room = await this.room.findUnique({
      where: { id: createPeliculaDto.roomId },
    });

    const seats = [];
    for (let row = 1; row <= room.rows; row++) {
      for (let col = 1; col <= room.columns; col++) {
        seats.push({
          rowNumber: row,
          columnNumber: col,
          status: 'available',
          roomId: room.id,
          movieId: pelicula.id,
        });
      }
    }

    await this.seat.createMany({
      data: seats,
    });

    return pelicula;
  }

  findAll() {
    return this.movie.findMany();
  }

  update(id: number, updatePeliculaDto: UpdatePeliculaDto) {
    return this.movie.update({
      where: { id },
      data: {
        title: updatePeliculaDto.title,
        imgUrl: updatePeliculaDto.imgUrl,
        room: {
          connect: { id: updatePeliculaDto.roomId },
        },
      },
    });
  }

  remove(id: number) {
    return this.movie.delete({
      where: { id },
    });
  }
}
