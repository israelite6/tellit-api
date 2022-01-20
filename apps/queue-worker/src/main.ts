import { NestFactory } from '@nestjs/core';
import { QueueWorkerModule } from './queue-worker.module';

async function bootstrap() {
  const app = await NestFactory.create(QueueWorkerModule);
  await app.listen(3901);
}
bootstrap();
