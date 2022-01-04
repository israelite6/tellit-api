import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersRespository } from '../../repositories/users/users.respository';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, UsersRespository],
})
export class AuthModule {}
