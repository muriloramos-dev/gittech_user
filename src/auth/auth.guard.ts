import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromCookie(request);
    
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }
    
    try {
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        throw new UnauthorizedException('Internal server configuration error');
      }

      const payload = await this.jwtService.verifyAsync(token, {
        secret: secret,
      });
      
      // Anexar o payload do usuário ao request
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
    
    return true;
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    return request.cookies?.accessToken;
  }
}
