import { Module } from '@nestjs/common';
import { RuntimeModule } from './runtime/runtime.module';
import { VerificacionDeOutboxPatternYReduplicacionConRabbitMqRealModule } from './verificacion-de-outbox-pattern-y-reduplicacion-con-rabbit-mq-real/verificacion-de-outbox-pattern-y-reduplicacion-con-rabbit-mq-real.module';

@Module({
  imports: [RuntimeModule, VerificacionDeOutboxPatternYReduplicacionConRabbitMqRealModule]
})
export class AppModule {}
