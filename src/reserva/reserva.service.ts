import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReservaService extends PrismaService implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async obtenerAsientosPorPelicula(movieId: number) {
    return this.seat.findMany({
      where: { movieId },
    });
  }

  async seleccionarAsiento(seatId: number) {
    const seat = await this.seat.findUnique({ where: { id: seatId } });

    if (!seat) {
      throw new Error(`El asiento con ID ${seatId} no existe.`);
    }

    // Continuar con la lógica de selección del asiento
    await this.seat.update({
      where: { id: seatId },
      data: { status: 'occupied' },
    });

    // Lógica del desbloqueo como antes
    setTimeout(async () => {
      const seat = await this.seat.findUnique({ where: { id: seatId } });
      if (seat && seat.status === 'occupied') {
        await this.desbloquearAsiento(seatId);
      }
    }, 60000);
  }

  async confirmarAsientos(seatIds: number[]) {
    const seats = await this.seat.findMany({
      where: { id: { in: seatIds } },
    });

    const invalidSeats = seats.filter((seat) => seat.status !== 'occupied');
    if (invalidSeats.length > 0) {
      throw new Error(
        'Algunos asientos no están seleccionados y no pueden ser confirmados.',
      );
    }

    return this.seat.updateMany({
      where: { id: { in: seatIds } },
      data: { status: 'confirmed' },
    });
  }

  async desbloquearAsiento(seatId: number) {
    const seat = await this.seat.findUnique({ where: { id: seatId } });
    if (seat.status === 'occupied') {
      return this.seat.update({
        where: { id: seatId },
        data: { status: 'available' },
      });
    }
  }
}
