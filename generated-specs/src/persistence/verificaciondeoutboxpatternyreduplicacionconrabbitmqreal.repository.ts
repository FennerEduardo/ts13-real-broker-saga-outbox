import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { currentTenant } from '../infrastructure/multitenancy/tenant.storage';
import type { VerificacionDeOutboxPatternYReduplicacionConRabbitMqReal } from '@prisma/client';

@Injectable()
export class VerificacionDeOutboxPatternYReduplicacionConRabbitMqRealRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<VerificacionDeOutboxPatternYReduplicacionConRabbitMqReal | null> {
    return this.prisma.tenant.verificacionDeOutboxPatternYReduplicacionConRabbitMqReal.findUnique({ where: { id } });
  }

  /** Creates a row for the tenant of the authenticated request (never a default tenant). */
  async save(data: Omit<VerificacionDeOutboxPatternYReduplicacionConRabbitMqReal, 'id' | 'tenantId' | 'createdAt' | 'updatedAt'>): Promise<VerificacionDeOutboxPatternYReduplicacionConRabbitMqReal> {
    return this.prisma.tenant.verificacionDeOutboxPatternYReduplicacionConRabbitMqReal.create({
      data: { ...data, tenantId: currentTenant() },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.tenant.verificacionDeOutboxPatternYReduplicacionConRabbitMqReal.delete({ where: { id } });
  }
}
