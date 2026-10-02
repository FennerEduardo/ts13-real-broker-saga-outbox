import { Injectable, Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler, EventBus } from '@nestjs/cqrs';
import { PrismaService } from '../prisma/prisma.service';
import {
  VerificacionDeOutboxPatternYReduplicacionConRabbitMqRealInitiatedEvent,
  VerificacionDeOutboxPatternYReduplicacionConRabbitMqRealAuthorizedEvent,
  VerificacionDeOutboxPatternYReduplicacionConRabbitMqRealCompletedEvent,
  VerificacionDeOutboxPatternYReduplicacionConRabbitMqRealFailedEvent,
  AuthorizeVerificacionDeOutboxPatternYReduplicacionConRabbitMqRealCommand,
  CompleteVerificacionDeOutboxPatternYReduplicacionConRabbitMqRealCommand,
  CompensateVerificacionDeOutboxPatternYReduplicacionConRabbitMqRealCommand,
} from './verificacionDeOutboxPatternYReduplicacionConRabbitMqReal-saga.contracts';

@Injectable()
export class VerificacionDeOutboxPatternYReduplicacionConRabbitMqRealSagaOrchestrator {
  private readonly logger = new Logger(VerificacionDeOutboxPatternYReduplicacionConRabbitMqRealSagaOrchestrator.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  /**
   * Main entry point for events into the saga.
   * This acts as the state machine transition engine.
   */
  async handleEvent(event: any) {
    if (event instanceof VerificacionDeOutboxPatternYReduplicacionConRabbitMqRealInitiatedEvent) {
      await this.handleInitiated(event);
    } else if (event instanceof VerificacionDeOutboxPatternYReduplicacionConRabbitMqRealAuthorizedEvent) {
      await this.handleAuthorized(event);
    } else if (event instanceof VerificacionDeOutboxPatternYReduplicacionConRabbitMqRealCompletedEvent) {
      await this.handleCompleted(event);
    } else if (event instanceof VerificacionDeOutboxPatternYReduplicacionConRabbitMqRealFailedEvent) {
      await this.handleFailed(event);
    }
  }

  private async handleInitiated(event: VerificacionDeOutboxPatternYReduplicacionConRabbitMqRealInitiatedEvent) {
    this.logger.log(`Saga initiated: ${event.correlationId}`);
    
    // Save initial state to DB
    await this.prisma.sagaInstance.create({
      data: {
        id: event.correlationId,
        sagaType: 'VerificacionDeOutboxPatternYReduplicacionConRabbitMqReal',
        currentState: 'STARTED',
        entityId: event.verificacionDeOutboxPatternYReduplicacionConRabbitMqRealId,
        metadata: JSON.stringify(event.metadata),
      },
    });

    // Dispatch next command via EventBus (or Outbox)
    this.eventBus.publish(new AuthorizeVerificacionDeOutboxPatternYReduplicacionConRabbitMqRealCommand(event.verificacionDeOutboxPatternYReduplicacionConRabbitMqRealId, event.metadata));
  }

  private async handleAuthorized(event: VerificacionDeOutboxPatternYReduplicacionConRabbitMqRealAuthorizedEvent) {
    this.logger.log(`Saga authorized: ${event.correlationId}`);

    const saga = await this.prisma.sagaInstance.findUnique({ where: { id: event.correlationId } });
    if (!saga) throw new Error(`Saga not found: ${event.correlationId}`);

    await this.prisma.sagaInstance.update({
      where: { id: event.correlationId },
      data: { currentState: 'COMPLETING', updatedAt: new Date() },
    });

    this.eventBus.publish(new CompleteVerificacionDeOutboxPatternYReduplicacionConRabbitMqRealCommand(saga.entityId));
  }

  private async handleCompleted(event: VerificacionDeOutboxPatternYReduplicacionConRabbitMqRealCompletedEvent) {
    this.logger.log(`Saga completed: ${event.correlationId}`);
    await this.prisma.sagaInstance.update({
      where: { id: event.correlationId },
      data: { currentState: 'COMPLETED', updatedAt: new Date() },
    });
  }

  private async handleFailed(event: VerificacionDeOutboxPatternYReduplicacionConRabbitMqRealFailedEvent) {
    this.logger.warn(`Saga failed: ${event.correlationId}, reason: ${event.reason}`);
    
    const saga = await this.prisma.sagaInstance.findUnique({ where: { id: event.correlationId } });
    if (!saga) throw new Error(`Saga not found: ${event.correlationId}`);

    await this.prisma.sagaInstance.update({
      where: { id: event.correlationId },
      data: { 
        currentState: 'COMPENSATING', 
        errorReason: event.reason,
        updatedAt: new Date() 
      },
    });

    this.eventBus.publish(new CompensateVerificacionDeOutboxPatternYReduplicacionConRabbitMqRealCommand(saga.entityId, event.reason));
    
    // Once compensation command is sent, we can mark it failed
    await this.prisma.sagaInstance.update({
      where: { id: event.correlationId },
      data: { currentState: 'FAILED', updatedAt: new Date() },
    });
  }
}

// Global Event Handler to route events into the Saga Orchestrator
@EventsHandler(
  VerificacionDeOutboxPatternYReduplicacionConRabbitMqRealInitiatedEvent,
  VerificacionDeOutboxPatternYReduplicacionConRabbitMqRealAuthorizedEvent,
  VerificacionDeOutboxPatternYReduplicacionConRabbitMqRealCompletedEvent,
  VerificacionDeOutboxPatternYReduplicacionConRabbitMqRealFailedEvent,
)
export class VerificacionDeOutboxPatternYReduplicacionConRabbitMqRealSagaEventHandler implements IEventHandler<any> {
  constructor(private readonly orchestrator: VerificacionDeOutboxPatternYReduplicacionConRabbitMqRealSagaOrchestrator) {}

  async handle(event: any) {
    await this.orchestrator.handleEvent(event);
  }
}
