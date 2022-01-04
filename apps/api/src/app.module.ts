import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './services/prisma/prisma.service';
import { UsersModule } from './app/users/users.module';
import { GlobalModule } from './modules/global.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './app/auth/auth.module';
import configurations from './config/configruations';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
  imports: [
    UsersModule,
    GlobalModule,
    ConfigModule.forRoot({ isGlobal: true, load: [configurations] }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
})
export class AppModule {}
