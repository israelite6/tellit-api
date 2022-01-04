import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { HashMatchParamInterface } from './helper.interface';

@Injectable()
export class HelperService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async hash(plainText: string): Promise<string> {
    const hash = await bcrypt.hash(
      plainText,
      this.configService.get<number>('salt'),
    );
    return hash;
  }

  async hashMatches({ plainText, hash }: HashMatchParamInterface) {
    const isMatch = await bcrypt.compare(plainText, hash);
    return isMatch;
  }

  signJwt(user: Partial<User>) {
    const payload = { userId: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
      id: user.id,
    };
  }
}
