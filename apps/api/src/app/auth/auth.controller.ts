import { ResetPasswordDto } from './dto/reset-password.dto';
import { ForgetPasswordDto } from './dto/forget-password.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Public } from '../../decorators/public.decorator';

@Controller({ version: '1', path: 'auth' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @Public()
  @Post('/forget-password')
  forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
    return this.authService.forgetPassword(forgetPasswordDto.email);
  }

  @Public()
  @Post('/reset-password')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }
}
