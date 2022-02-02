import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './services/prisma/prisma.service';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { TransformResponseInterceptor } from './interceptor/response-transform.interceptor';

import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter as BullAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { Queue } from 'bull';
import * as expressBasicAuth from 'express-basic-auth';
import { SEND_EMAIL_QUEUE_NAME } from './config/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      skipNullProperties: true,
      skipUndefinedProperties: true,
      forbidUnknownValues: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new TransformResponseInterceptor());
  const prismaService: PrismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  app.enableCors();

  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath('/queues');

  const aQueue = app.get<Queue>(`BullQueue_${SEND_EMAIL_QUEUE_NAME}`);

  createBullBoard({
    queues: [new BullAdapter(aQueue)],
    serverAdapter,
  });

  app.use(
    '/queues',
    expressBasicAuth({
      users: {
        user: 'password',
      },
      challenge: true,
    }),
    serverAdapter.getRouter(),
  );
  await app.listen(3900);
}
bootstrap();

//for prisma to accept bigInt as seria
(BigInt as any).prototype.toJSON = function () {
  return this.toString();
};
