import { Inject, Injectable } from '@nestjs/common';
import { DB_POOL } from '../db/db.module';
import { EmailService } from '../email/email.service';
import type { Pool } from 'mysql2/promise';

@Injectable()
export class ContactService {
  constructor(
    @Inject(DB_POOL) private readonly pool: Pool,
    private readonly email: EmailService,
  ) {}

  async create(data: { name: string; email: string; phone?: string; message: string }) {
    const [result] = await this.pool.query(
      'INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)',
      [data.name, data.email, data.phone || null, data.message],
    );
    // @ts-ignore
    const id = result.insertId;
    this.email.sendContactNotification(data).catch(() => {});
    return { id, ...data };
  }

  async findAll() {
    const [rows] = await this.pool.query('SELECT * FROM contacts ORDER BY created_at DESC');
    return rows as any[];
  }
}

