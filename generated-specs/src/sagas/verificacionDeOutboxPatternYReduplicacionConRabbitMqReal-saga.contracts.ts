// --------------------------------------------------------------------------
// Saga Contracts for VerificacionDeOutboxPatternYReduplicacionConRabbitMqReal
// --------------------------------------------------------------------------

// === Events ===
export class VerificacionDeOutboxPatternYReduplicacionConRabbitMqRealInitiatedEvent {
  constructor(public readonly correlationId: string, public readonly verificacionDeOutboxPatternYReduplicacionConRabbitMqRealId: string, public readonly metadata: any) {}
}
export class VerificacionDeOutboxPatternYReduplicacionConRabbitMqRealAuthorizedEvent {
  constructor(public readonly correlationId: string) {}
}
export class VerificacionDeOutboxPatternYReduplicacionConRabbitMqRealCompletedEvent {
  constructor(public readonly correlationId: string) {}
}
export class VerificacionDeOutboxPatternYReduplicacionConRabbitMqRealFailedEvent {
  constructor(public readonly correlationId: string, public readonly reason: string) {}
}

// === Commands ===
export class AuthorizeVerificacionDeOutboxPatternYReduplicacionConRabbitMqRealCommand {
  constructor(public readonly verificacionDeOutboxPatternYReduplicacionConRabbitMqRealId: string, public readonly metadata: any) {}
}
export class CompleteVerificacionDeOutboxPatternYReduplicacionConRabbitMqRealCommand {
  constructor(public readonly verificacionDeOutboxPatternYReduplicacionConRabbitMqRealId: string) {}
}
export class CompensateVerificacionDeOutboxPatternYReduplicacionConRabbitMqRealCommand {
  constructor(public readonly verificacionDeOutboxPatternYReduplicacionConRabbitMqRealId: string, public readonly reason: string) {}
}
