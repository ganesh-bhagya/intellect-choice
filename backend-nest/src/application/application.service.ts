import { Inject, Injectable } from '@nestjs/common';
import { DB_POOL } from '../db/db.module';
import { EmailService } from '../email/email.service';
import type { Pool } from 'mysql2/promise';

@Injectable()
export class ApplicationService {
  constructor(
    @Inject(DB_POOL) private readonly pool: Pool,
    private readonly email: EmailService,
  ) {}

  async create(data: {
    name: string;
    email: string;
    phone?: string;
    position: string;
    message?: string;
    cvPath?: string | null;
    cvOriginalName?: string | null;
  }) {
    const [result] = await this.pool.query(
      'INSERT INTO applications (name, email, phone, position, message, cv_path, cv_original_name) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        data.name,
        data.email,
        data.phone || null,
        data.position,
        data.message || null,
        data.cvPath || null,
        data.cvOriginalName || null,
      ],
    );
    // @ts-ignore
    const id = result.insertId;
    this.email
      .sendApplicationNotification({
        name: data.name,
        email: data.email,
        phone: data.phone,
        position: data.position,
        message: data.message,
        cvOriginalName: data.cvOriginalName,
      })
      .catch(() => {});
    return { id, ...data };
  }

  async findAll() {
    const [rows] = await this.pool.query('SELECT * FROM applications ORDER BY created_at DESC');
    return rows as any[];
  }

  async findOne(id: number) {
    const [rows] = await this.pool.query('SELECT * FROM applications WHERE id = ?', [id]);
    const arr = rows as any[];
    return arr[0] || null;
  }
}

