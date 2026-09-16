import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { VerificacindeOutboxPatternyReduplicacinconRabbitMQReal } from '@prisma/client';

@Injectable()
export class VerificacindeOutboxPatternyReduplicacinconRabbitMQRealRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<VerificacindeOutboxPatternyReduplicacinconRabbitMQReal | null> {
    return this.prisma.verificacindeoutboxpatternyreduplicacinconrabbitmqreal.findUnique({ where: { id } });
  }

  async save(data: Omit<VerificacindeOutboxPatternyReduplicacinconRabbitMQReal, 'id' | 'createdAt' | 'updatedAt'>): Promise<VerificacindeOutboxPatternyReduplicacinconRabbitMQReal> {
    return this.prisma.verificacindeoutboxpatternyreduplicacinconrabbitmqreal.create({
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.verificacindeoutboxpatternyreduplicacinconrabbitmqreal.delete({ where: { id } });
  }
}
