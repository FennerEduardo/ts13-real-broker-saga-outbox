import { Module } from '@nestjs/common';
import { ApplicationCqrsModule } from './verificacion-de-outbox-pattern-y-reduplicacion-con-rabbit-mq-real/verificacion-de-outbox-pattern-y-reduplicacion-con-rabbit-mq-real.cqrs';

@Module({
  imports: [ApplicationCqrsModule]
})
export class AppModule {}
