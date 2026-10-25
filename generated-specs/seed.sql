-- Generated Seed SQL Fixtures for PostgreSQL / MySQL
-- Feature: Verificación de Outbox Pattern y Reduplicación con RabbitMQ Real

INSERT INTO verificaci_n_de_outbox_pattern_y_reduplicaci_n_con_rabbitmq_real (id)
VALUES (
  'f47ac10b-58cc-4372-a567-0e02b2c3d479'
) ON CONFLICT (id) DO NOTHING;
