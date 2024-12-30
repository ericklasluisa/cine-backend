import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
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

  private clients = new Map<string, Socket>();

  constructor(private readonly reservaService: ReservaService) {}

  async handleConnection(client: Socket) {
    console.log(`Usuario Conectado: ${client.id}`);
    this.clients.set(client.id, client);
  }

  handleDisconnect(client: Socket) {
    console.log(`Usuario Desconectado: ${client.id}`);
    this.clients.delete(client.id);
  }

  @SubscribeMessage('obtenerAsientosPorPelicula')
  async handleGetSeatsByMovie(@MessageBody() data: { movieId: number }) {
    if (!data?.movieId) {
      throw new WsException('movieId es requerido');
    }

    try {
      const asientos = await this.reservaService.obtenerAsientosPorPelicula(
        data.movieId,
      );
      this.server.emit('asientos', asientos);
      console.log('Obtener asientos por pelicula');
      return asientos;
    } catch (error) {
      console.error(`Error obteniendo asientos: ${error.message}`);
      throw new WsException(error.message);
    }
  }

  @SubscribeMessage('seleccionarAsiento')
  async handleSelectSeat(
    @MessageBody() data: { seatId: number; movieId: number },
  ) {
    if (!data?.seatId || !data?.movieId) {
      throw new WsException('seatId y movieId son requeridos');
    }

    try {
      await this.reservaService.seleccionarAsiento(data.seatId);
      const asientos = await this.reservaService.obtenerAsientosPorPelicula(
        data.movieId,
      );
      console.log('Seleccionar asiento');
      this.server.emit('asientos', asientos);
      return asientos;
    } catch (error) {
      console.error(`Error seleccionando asiento: ${error.message}`);
      throw new WsException(error.message);
    }
  }

  @SubscribeMessage('confirmarAsientos')
  async handleConfirmSeats(
    @MessageBody() data: { seatIds: number[]; movieId: number },
  ) {
    if (!data?.seatIds?.length || !data?.movieId) {
      throw new WsException('seatIds y movieId son requeridos');
    }

    try {
      await this.reservaService.confirmarAsientos(data.seatIds);
      const asientos = await this.reservaService.obtenerAsientosPorPelicula(
        data.movieId,
      );
      console.log('Confirmar asientos');
      this.server.emit('asientos', asientos);
      return asientos;
    } catch (error) {
      console.error(`Error confirmando asientos: ${error.message}`);
      throw new WsException(error.message);
    }
  }

  @SubscribeMessage('desbloquearAsiento')
  async handleUnlockSeat(
    @MessageBody() data: { seatId: number; movieId: number },
  ) {
    if (!data?.seatId || !data?.movieId) {
      throw new WsException('seatId y movieId son requeridos');
    }

    try {
      await this.reservaService.desbloquearAsiento(data.seatId);
      const asientos = await this.reservaService.obtenerAsientosPorPelicula(
        data.movieId,
      );
      console.log('Desbloquear asiento');
      this.server.emit('asientos', asientos);
      return asientos;
    } catch (error) {
      console.error(`Error desbloqueando asiento: ${error.message}`);
      throw new WsException(error.message);
    }
  }
}
