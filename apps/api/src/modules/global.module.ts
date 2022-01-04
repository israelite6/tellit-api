import { Global, Module } from '@nestjs/common';
import { HelperService } from '../services/helper/helper.service';
import { PrismaService } from '../services/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../services/jwt/jwt.strategy';
import { BullModules } from './bull.module';

@Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwtSecret'),
        signOptions: {
          expiresIn: configService.get<string>('jwtExpiration'),
        },
      }),
      inject: [ConfigService],
    }),
    BullModules,
  ],
  providers: [PrismaService, HelperService, JwtStrategy],
  exports: [PrismaService, HelperService, JwtModule, JwtStrategy, BullModules],
})
export class GlobalModule {}
