import { Inject, Injectable } from '@nestjs/common';
import { IUser } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { comparePassword } from 'src/utils/auth';
import { LoginUserDto } from './dto/login-user.dto';

type ErrorCode = 'PASSWORD_DONT_MATCH' | 'USER_NOT_FOUND'

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService
  ) {}

  async tryAuthorize(loginUserDto: LoginUserDto): Promise<IUser | ErrorCode> {
    const user = await this.usersService.findByLogin(loginUserDto.login)
    if (!user) {
      return 'USER_NOT_FOUND'
    }

    const passwordMatched = await comparePassword(loginUserDto.password, user.passwordHash)
    if (!passwordMatched) {
      return 'PASSWORD_DONT_MATCH'
    }

    return user
  }
}
