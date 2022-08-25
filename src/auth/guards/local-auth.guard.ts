import { CanActivate, ExecutionContext, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Iuser } from 'users/types';

interface Irequest<T> extends Request {
  body: T,
  token: string
}

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { headers: { authorization } }: Irequest<unknown> = context.switchToHttp().getRequest()
    if (!authorization)
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)

    const token: string = authorization.split(' ')[1]
    context.switchToHttp().getRequest().token = token

    try {
      this.jwtService.verify(token, { secret: process.env.JWT_SECRET })
    } catch {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
    }

    return true
  }
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService
  ) {}
  
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { token }: Irequest<unknown> = context.switchToHttp().getRequest();
    const { payload } = this.jwtService.decode(token) as { payload: Iuser }

    return payload.role.toLowerCase() === 'admin'
  }
}
