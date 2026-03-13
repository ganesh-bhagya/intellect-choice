import { Inject, Injectable } from '@nestjs/common';
import type { Pool } from 'mysql2/promise';
import { DB_POOL } from '../db/db.module';

export interface JobDto {
  title: string;
  location?: string;
  type?: string;
  category?: string;
  description?: string;
  isActive?: boolean;
}

@Injectable()
export class JobService {
  constructor(@Inject(DB_POOL) private readonly pool: Pool) {}

  async findAll() {
    const [rows] = await this.pool.query('SELECT * FROM jobs ORDER BY created_at DESC');
    return rows as any[];
  }

  async create(data: JobDto) {
    const [result] = await this.pool.query(
      'INSERT INTO jobs (title, location, type, category, description, is_active) VALUES (?, ?, ?, ?, ?, ?)',
      [
        data.title,
        data.location || null,
        data.type || null,
        data.category || null,
        data.description || null,
        data.isActive ?? true,
      ],
    );
    // @ts-ignore
    const id = result.insertId;
    return { id, ...data };
  }

  async update(id: number, data: JobDto) {
    await this.pool.query(
      'UPDATE jobs SET title = ?, location = ?, type = ?, category = ?, description = ?, is_active = ? WHERE id = ?',
      [
        data.title,
        data.location || null,
        data.type || null,
        data.category || null,
        data.description || null,
        data.isActive ?? true,
        id,
      ],
    );
    const [rows] = await this.pool.query('SELECT * FROM jobs WHERE id = ?', [id]);
    const arr = rows as any[];
    return arr[0] || null;
  }

  async remove(id: number) {
    await this.pool.query('DELETE FROM jobs WHERE id = ?', [id]);
    return { success: true };
  }

  async findActive() {
    const [rows] = await this.pool.query(
      'SELECT id, title, location, type, category, description, created_at FROM jobs WHERE is_active = 1 ORDER BY created_at DESC',
    );
    return rows as any[];
  }
}

