-- Generated Seed SQL Fixtures for PostgreSQL / MySQL
-- Feature: Verificación de Outbox Pattern y Reduplicación con RabbitMQ Real

INSERT INTO verificaci_n_de_outbox_pattern_y_reduplicaci_n_con_rabbitmq_real (id, outbox, cola, como)
VALUES (
  'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'test', 'test', 'test'
) ON CONFLICT (id) DO NOTHING;
