import { Module } from '@nestjs/common';
import type { Pool } from 'pg';
import { CommandService } from '../runtime/command-service';
import { PG_POOL } from '../runtime/runtime.module';
import { VerificacionDeOutboxPatternYReduplicacionConRabbitMqRealController } from './verificacion-de-outbox-pattern-y-reduplicacion-con-rabbit-mq-real.controller';

@Module({
  controllers: [VerificacionDeOutboxPatternYReduplicacionConRabbitMqRealController],
  providers: [{ provide: CommandService, useFactory: (pool: Pool) => new CommandService(pool), inject: [PG_POOL] }]
})
export class VerificacionDeOutboxPatternYReduplicacionConRabbitMqRealModule {}
