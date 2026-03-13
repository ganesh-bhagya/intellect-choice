import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import type { Pool } from 'mysql2/promise';
import { DB_POOL } from '../db/db.module';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
    @Inject(DB_POOL) private readonly pool: Pool,
  ) {}

  async login(username: string, password: string): Promise<string> {
    // Look up admin user in the database
    const [rows] = await this.pool.query('SELECT * FROM admins WHERE username = ?', [username]);
    const admins = rows as any[];
    const admin = admins[0];
    if (!admin || admin.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: 'admin' };
    return this.jwt.sign(payload);
  }

  verifyToken(token: string) {
    return this.jwt.verify(token);
  }
}

