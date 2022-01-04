import { router } from 'bull-board';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SEND_EMAIL_QUEUE_NAME } from '../config/constants';
import { BullModule } from '@nestjs/bull';
import { BullUIService } from '../services/bull/bull-gui.service';

@Module({
  imports: [
    BullModule.forRootAsync('default', {
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>('redisHost'),
          port: configService.get<number>('redisPort'),
        },
        prefix: 'tellit_',
      }),
    }),
    BullModule.registerQueue({
      configKey: 'default',
      name: SEND_EMAIL_QUEUE_NAME,
    }),
  ],
  providers: [BullUIService],
  exports: [BullModule],
})
export class BullModules {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(router).forRoutes('/admin/queues');
  }
}
