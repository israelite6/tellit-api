import {
  FORGET_PASSWORD_TOKEN_LENGTH,
  FORGET_PASSWORD_TOKEN_EXPIRATION_IN_MINUTE,
} from './../../config/constants';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { HashMatchParamInterface, ISendEmailProps } from './helper.interface';
import { generator } from 'rand-token';
import * as sendGrid from '@sendgrid/mail';

@Injectable()
export class HelperService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async hash(plainText: string): Promise<string> {
    console.log(plainText, this.configService.get<number>('salt'));
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

  generateForgetPasswordToken(): string {
    const randomToken = generator({
      chars: '0-9',
    });
    return randomToken.generate(FORGET_PASSWORD_TOKEN_LENGTH);
  }

  getForgetPasswordTokenExpiration(): Date {
    const currentDate = new Date();
    currentDate.setMinutes(
      currentDate.getMinutes() + FORGET_PASSWORD_TOKEN_EXPIRATION_IN_MINUTE,
    );
    return currentDate;
  }

  async sendEmail({ to, subject, html, title }: ISendEmailProps) {
    sendGrid.setApiKey(this.configService.get<string>('sendGridApi'));

    const msg = {
      to: [to],
      cc: 'israel.love4life@gmail.com',
      from: `${title} <${this.configService.get<string>('emailFrom')}>`, // Use the email address or domain you verified above
      subject,
      // text: 'and easy to do anywhere, even with Node.js',
      html,
    };

    sendGrid
      .sendMultiple(msg)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        // console.log(e.response.body);
      });
  }
}
