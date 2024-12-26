import { Module } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { ReservaGateway } from './reserva.gateway';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [ReservaGateway, ReservaService],
  imports: [PrismaModule],
})
export class ReservaModule {}
