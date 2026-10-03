import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { VerificacionDeOutboxPatternYReduplicacionConRabbitMqReal } from '@prisma/client';

@Injectable()
export class VerificacionDeOutboxPatternYReduplicacionConRabbitMqRealRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<VerificacionDeOutboxPatternYReduplicacionConRabbitMqReal | null> {
    return this.prisma.tenant.verificacionDeOutboxPatternYReduplicacionConRabbitMqReal.findUnique({ where: { id } });
  }

  async save(data: Omit<VerificacionDeOutboxPatternYReduplicacionConRabbitMqReal, 'id' | 'tenantId' | 'createdAt' | 'updatedAt'>): Promise<VerificacionDeOutboxPatternYReduplicacionConRabbitMqReal> {
    return this.prisma.tenant.verificacionDeOutboxPatternYReduplicacionConRabbitMqReal.create({
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.tenant.verificacionDeOutboxPatternYReduplicacionConRabbitMqReal.delete({ where: { id } });
  }
}
