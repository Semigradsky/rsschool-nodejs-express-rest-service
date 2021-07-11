import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { IUser } from 'src/users/user.entity';
import { createSessionToken } from 'src/utils/auth';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

interface LoginStatus {
  user: IUser;
  token: string;
}

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async create(@Body() loginUserDto: LoginUserDto): Promise<LoginStatus> {
    const auth = await this.authService.tryAuthorize(loginUserDto);

    if (typeof auth === 'string') {
      throw new HttpException('Incorrect login or password', HttpStatus.FORBIDDEN);
    }

    const token = await createSessionToken({
      login: auth.login,
      userId: auth.id,
    });

    return {
      user: auth,
      token,
    };
  }
}
