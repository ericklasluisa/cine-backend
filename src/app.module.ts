import { Module } from '@nestjs/common';
import { ReservaModule } from './reserva/reserva.module';
import { PeliculasModule } from './peliculas/peliculas.module';
import { SalaModule } from './sala/sala.module';
import { AsientosModule } from './asientos/asientos.module';

@Module({
  imports: [ReservaModule, PeliculasModule, SalaModule, AsientosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
