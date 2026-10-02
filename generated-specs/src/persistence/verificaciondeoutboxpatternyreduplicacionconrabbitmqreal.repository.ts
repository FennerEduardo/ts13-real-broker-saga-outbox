import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { VerificacionDeOutboxPatternYReduplicacionConRabbitMqReal } from '@prisma/client';

@Injectable()
export class VerificacionDeOutboxPatternYReduplicacionConRabbitMqRealRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<VerificacionDeOutboxPatternYReduplicacionConRabbitMqReal | null> {
    return this.prisma.verificacionDeOutboxPatternYReduplicacionConRabbitMqReal.findUnique({ where: { id } });
  }

  async save(data: Omit<VerificacionDeOutboxPatternYReduplicacionConRabbitMqReal, 'id' | 'createdAt' | 'updatedAt'>): Promise<VerificacionDeOutboxPatternYReduplicacionConRabbitMqReal> {
    return this.prisma.verificacionDeOutboxPatternYReduplicacionConRabbitMqReal.create({
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.verificacionDeOutboxPatternYReduplicacionConRabbitMqReal.delete({ where: { id } });
  }
}
