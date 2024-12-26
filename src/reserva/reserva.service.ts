import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReservaService {
  constructor(private prisma: PrismaService) {}

  async obtenerAsientosPorPelicula(movieId: number) {
    return this.prisma.seat.findMany({
      where: {
        movieId,
      },
      include: { room: true },
    });
  }

  async seleccionarAsiento(seatId: number) {
    return this.prisma.seat.update({
      where: { id: seatId },
      data: { status: 'selected' },
    });
  }

  async confirmarAsientos(seatIds: number[]) {
    return this.prisma.seat.updateMany({
      where: { id: { in: seatIds } },
      data: { status: 'occupied' },
    });
  }
}
