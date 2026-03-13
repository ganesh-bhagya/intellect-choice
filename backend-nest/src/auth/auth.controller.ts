import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminGuard } from './admin.guard';
import type { Response } from 'express';

@Controller('api/admin')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('login')
  async login(
    @Body() body: { username: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.auth.login(body.username, body.password);
    const isProduction = process.env.NODE_ENV === 'production';
    // In production we serve API from a different subdomain than the frontend,
    // so we must use SameSite=None for the cookie to be sent on cross-site
    // XHR/fetch requests.
    const sameSite: 'lax' | 'strict' | 'none' =
      isProduction ? 'none' : 'lax';
    res.cookie('admin_token', token, {
      httpOnly: true,
      sameSite,
      secure: isProduction,
      path: '/',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });
    return { success: true, user: 'admin' };
  }

  @UseGuards(AdminGuard)
  @Get('me')
  me() {
    return { user: 'admin' };
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('admin_token', { path: '/', httpOnly: true });
    return { success: true };
  }
}

