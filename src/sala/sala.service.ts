import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateSalaDto } from './dto/create-sala.dto';
import { UpdateSalaDto } from './dto/update-sala.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SalaService extends PrismaService implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async create(createSalaDto: CreateSalaDto) {
    const sala = await this.room.create({
      data: createSalaDto,
    });

    return sala;
  }

  findAll() {
    return this.room.findMany();
  }

  findOne(id: number) {
    return this.room.findUnique({
      where: { id },
    });
  }

  update(id: number, updateSalaDto: UpdateSalaDto) {
    return this.room.update({
      where: { id },
      data: updateSalaDto,
    });
  }

  remove(id: number) {
    return this.room.delete({
      where: { id },
    });
  }
}
