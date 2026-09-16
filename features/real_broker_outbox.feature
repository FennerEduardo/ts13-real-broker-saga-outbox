# language: es
Característica: Verificación de Outbox Pattern y Reduplicación con RabbitMQ Real

  Escenario: Publicación Reintentada y Procesamiento Idempotente con Broker Real
    Dado que el contenedor de RabbitMQ está activo y saludable en `amqp://rabbitmq:5672`
    Cuando se inserta un evento de pedido en la tabla Outbox "order_outbox" de PostgreSQL
    Y el proceso Outbox Publisher lee la tabla y publica el mensaje en la cola "order.created.queue"
    Entonces el consumidor de la cola procesa el mensaje y marca el registro Outbox como "PROCESSED"
    Cuando se fuerza una reentrega del mismo `MessageId` simulated desde RabbitMQ
    Entonces el consumidor detecta la llave de idempotencia y rechaza duplicar la operación en DB
    Y la suite de integración de `ghk verify --docker` completa la prueba con código de salida 0
