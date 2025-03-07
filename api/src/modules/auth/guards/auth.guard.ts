import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {Request} from 'express';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {
  }

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];
    if (!token) throw new UnauthorizedException('Token manquant');

    try {
      request.user = this.jwtService.verify(token, {secret: process.env.JWT_SECRET});
    } catch (err) {
      throw new UnauthorizedException('Token invalide');
    }
    return true;
  }
}
