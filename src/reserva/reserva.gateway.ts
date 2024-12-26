import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ReservaService } from './reserva.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ReservaGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private readonly reservaService: ReservaService) {}
  handleConnection(client: Socket) {
    console.log(`Usuario Conectado: ${client.id}`);
  }
  handleDisconnect(client: Socket) {
    console.log(`Usuario Desconectado: ${client.id}`);
  }

  @SubscribeMessage('obtenerAsientos')
  async obtenerAsientos(@MessageBody() movieId: number) {
    const seats = await this.reservaService.obtenerAsientosPorPelicula(movieId);
    console.log(seats);
    return seats;
  }

  @SubscribeMessage('seleccionarAsiento')
  async handleSelectSeat(
    @MessageBody() data: { seatId: number; movieId: number },
  ) {
    const updatedSeat = await this.reservaService.seleccionarAsiento(
      data.seatId,
    );
    this.server.emit('asientoActualizado', updatedSeat);
    return updatedSeat;
  }

  @SubscribeMessage('confirmarAsientos')
  async handleConfirmSeats(
    @MessageBody() data: { seatIds: number[]; movieId: number },
  ) {
    const updatedSeats = await this.reservaService.confirmarAsientos(
      data.seatIds,
    );
    this.server.emit('asientosConfirmados', updatedSeats);
    return updatedSeats;
  }
}
