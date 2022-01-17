import { Module } from '@nestjs/common';
import { QueueWorkerController } from './queue-worker.controller';
import { QueueWorkerService } from './queue-worker.service';
import { ConfigModule } from '@nestjs/config';
import configurations from '../../api/src/config/configruations';
import { GlobalModule } from '../../api/src/modules/global.module';
import { EmailService } from './services/email.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configurations] }),
    GlobalModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'template'),
    }),
  ],
  controllers: [QueueWorkerController],
  providers: [QueueWorkerService, EmailService],
})
export class QueueWorkerModule {}
