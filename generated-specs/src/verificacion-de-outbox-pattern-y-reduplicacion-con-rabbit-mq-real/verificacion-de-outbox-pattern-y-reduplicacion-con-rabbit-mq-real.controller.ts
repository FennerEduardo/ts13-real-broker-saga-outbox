import { Body, Controller, Headers, HttpException, HttpStatus, Inject, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { CommandService } from '../runtime/command-service';
import { DomainValidationError } from './domain/verificacion-de-outbox-pattern-y-reduplicacion-con-rabbit-mq-real.aggregate';
import { JwtTenantGuard } from '../auth/jwt-tenant.guard';

const STATUS = { created: HttpStatus.ACCEPTED, replayed: HttpStatus.OK, 'in-progress': HttpStatus.CONFLICT } as const;

// ghk:implements VerificacionDeOutboxPatternYReduplicacionConRabbitMqReal
@Controller('api/v1/verificacion-de-outbox-pattern-y-reduplicacion-con-rabbit-mq-real')
@UseGuards(JwtTenantGuard)
export class VerificacionDeOutboxPatternYReduplicacionConRabbitMqRealController {
  constructor(@Inject(CommandService) private readonly commands: CommandService) {}

  /** POST /api/v1/verificacion-de-outbox-pattern-y-reduplicacion-con-rabbit-mq-real/:id/:command (process_verificacion_de_outbox_pattern_y_reduplicacion_con_rabbit_mq_real) */
  @Post(':id/:command')
  async handle(
    @Param('id') id: string,
    @Param('command') command: string,
    @Body() payload: Record<string, unknown> | undefined,
    @Headers('idempotency-key') idempotencyKey: string | undefined,
    @Headers('traceparent') traceparent: string | undefined,
    @Req() req: { tenantId: string },
    @Res({ passthrough: true }) res: { status(code: number): unknown }
  ) {
    try {
      const result = await this.commands.handle({ tenantId: req.tenantId, aggregateType: 'VerificacionDeOutboxPatternYReduplicacionConRabbitMqReal', aggregateId: id, command, payload: payload ?? {}, idempotencyKey, traceparent });
      res.status(STATUS[result.status]);
      return result;
    } catch (err) {
      // By name: every feature's domain module declares its own DomainValidationError class.
      if (err instanceof DomainValidationError || (err as Error)?.name === 'DomainValidationError') throw new HttpException((err as Error).message, HttpStatus.UNPROCESSABLE_ENTITY);
      throw err;
    }
  }
}
