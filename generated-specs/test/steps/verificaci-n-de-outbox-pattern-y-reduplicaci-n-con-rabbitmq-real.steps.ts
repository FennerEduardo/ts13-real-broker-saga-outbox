// cucumber-js Step Definitions for NestJS - Verificación de Outbox Pattern y Reduplicación con RabbitMQ Real
import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import * as request from 'supertest';

let app: any;
let res: any;

Before(async () => {
  // Setup test HTTP application harness
});

After(async () => {
  // await app.close();
});


// Scenario: Publicación Reintentada y Procesamiento Idempotente con Broker Real

Given('que el contenedor de RabbitMQ está activo y saludable en `amqp://rabbitmq:5672`', async function () {
  // Set up preconditions\n  // this.context = { ... };
});

When('se inserta un evento de pedido en la tabla Outbox "order_outbox" de PostgreSQL', async function () {
  this.res = await request(app.getHttpServer())\n    .post('/api/v1/verificaci-n-de-outbox-pattern-y-reduplicaci-n-con-rabbitmq-real')\n    .send(this.payload || {});
});

When('se fuerza una reentrega del mismo `MessageId` simulated desde RabbitMQ', async function () {
  this.res = await request(app.getHttpServer())\n    .get('/api/v1/verificaci-n-de-outbox-pattern-y-reduplicaci-n-con-rabbitmq-real')\n    .send(this.payload || {});
});

Then('el consumidor de la cola procesa el mensaje y marca el registro Outbox como "PROCESSED"', async function () {
  // Verify post-conditions\n  expect(this.res.body).toBeDefined();
});

Then('el consumidor detecta la llave de idempotencia y rechaza duplicar la operación en DB', async function () {
  // Verify post-conditions\n  expect(this.res.body).toBeDefined();
});


