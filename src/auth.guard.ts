import { Injectable, CanActivate, ExecutionContext, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import type { FastifyRequest } from 'fastify';
import type { Request } from 'express'
import { verifySessionToken } from './utils/auth';
import { UsersService } from './users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  private async validateRequest(request: Request | FastifyRequest): Promise<boolean> {
    const sessionToken = request.headers.authorization

    if (!sessionToken) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    try {
      const token = await verifySessionToken(sessionToken);
      const user = await this.usersService.findOne(token.userId);

      return !!user
    } catch (error) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
}
