import { VerificacionDeOutboxPatternYReduplicacionConRabbitMqRealAggregate, DomainValidationError } from './verificacion-de-outbox-pattern-y-reduplicacion-con-rabbit-mq-real.aggregate';

describe('VerificacionDeOutboxPatternYReduplicacionConRabbitMqRealAggregate', () => {
  it('starts in the initial state with no events', () => {
    const aggregate = new VerificacionDeOutboxPatternYReduplicacionConRabbitMqRealAggregate('agg-1');
    expect(aggregate.state).toBe('PENDING');
    expect(aggregate.version).toBe(0);
    expect(aggregate.pendingEvents).toHaveLength(0);
  });

  it('rejects an aggregate without id', () => {
    expect(() => new VerificacionDeOutboxPatternYReduplicacionConRabbitMqRealAggregate('')).toThrow(DomainValidationError);
  });

  it('processVerificacionDeOutboxPatternYReduplicacionConRabbitMqReal records Orderoutbox and bumps the version', () => {
    const aggregate = new VerificacionDeOutboxPatternYReduplicacionConRabbitMqRealAggregate('agg-1');
    const event = aggregate.processVerificacionDeOutboxPatternYReduplicacionConRabbitMqReal({ id: 'agg-1', payload: { source: 'test' } });
    expect(event.type).toBe('Orderoutbox');
    expect(event.version).toBe(1);
    expect(aggregate.version).toBe(1);
    expect(aggregate.pendingEvents).toEqual([event]);
  });

  it('processVerificacionDeOutboxPatternYReduplicacionConRabbitMqReal rejects a command without id', () => {
    const aggregate = new VerificacionDeOutboxPatternYReduplicacionConRabbitMqRealAggregate('agg-1');
    expect(() => aggregate.processVerificacionDeOutboxPatternYReduplicacionConRabbitMqReal({ id: '' })).toThrow(DomainValidationError);
    expect(aggregate.pendingEvents).toHaveLength(0);
  });
});
