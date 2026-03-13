import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly auth: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const token = req.cookies?.admin_token;
    if (!token) {
      throw new UnauthorizedException('Not authenticated');
    }
    try {
      const payload = this.auth.verifyToken(token);
      if (payload?.sub !== 'admin') {
        throw new UnauthorizedException('Not authenticated');
      }
      return true;
    } catch {
      throw new UnauthorizedException('Not authenticated');
    }
  }
}

