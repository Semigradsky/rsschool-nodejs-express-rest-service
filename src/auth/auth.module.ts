import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Global()
@Module({
  imports: [],
  exports: [],
  providers: [AuthService],
  controllers: [AuthController],
})

export class AuthModule {}