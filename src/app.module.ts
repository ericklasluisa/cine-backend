import { Module } from '@nestjs/common';
import { ReservaModule } from './reserva/reserva.module';

@Module({
  imports: [ReservaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
