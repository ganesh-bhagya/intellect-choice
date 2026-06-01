import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { Pool } from 'mysql2/promise';
import { DB_POOL } from '../db/db.module';

export interface BlogDto {
  title: string;
  coverImage?: string;
  shortDescription?: string;
  contentHtml?: string;
  isPublished?: boolean;
}

@Injectable()
export class BlogService {
  constructor(@Inject(DB_POOL) private readonly pool: Pool) {}

  private slugify(input: string): string {
    return String(input || '')
      .trim()
      .toLowerCase()
      .replace(/['"]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  private normalizeRows(rows: any[]) {
    return rows.map((r) => ({
      ...r,
      isPublished: r.is_published === 1 || r.isPublished === true,
    }));
  }

  private async ensureUniqueSlug(baseSlug: string, excludeId?: number): Promise<string> {
    let slug = baseSlug;
    let i = 2;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const [rows] = await this.pool.query('SELECT id FROM blogs WHERE slug = ?', [slug]);
      const found = (rows as any[])[0];
      if (!found || (excludeId && Number(found.id) === Number(excludeId))) return slug;
      slug = `${baseSlug}-${i++}`;
    }
  }

  async findAllAdmin() {
    const [rows] = await this.pool.query(
      `SELECT id, slug, title, cover_image AS coverImage, short_description AS shortDescription,
              content_html AS contentHtml, is_published, created_at AS createdAt, updated_at AS updatedAt
       FROM blogs
       ORDER BY created_at DESC`,
    );
    return this.normalizeRows(rows as any[]);
  }

  async findAllPublic(limit = 50, offset = 0) {
    const [rows] = await this.pool.query(
      `SELECT id, slug, title, cover_image AS coverImage, short_description AS shortDescription,
              created_at AS createdAt
       FROM blogs
       WHERE is_published = 1
       ORDER BY created_at DESC
       LIMIT ? OFFSET ?`,
      [Number(limit), Number(offset)],
    );
    return rows as any[];
  }

  async findOnePublicBySlug(slug: string) {
    const [rows] = await this.pool.query(
      `SELECT id, slug, title, cover_image AS coverImage, short_description AS shortDescription,
              content_html AS contentHtml, is_published, created_at AS createdAt, updated_at AS updatedAt
       FROM blogs
       WHERE slug = ? AND is_published = 1`,
      [slug],
    );
    const blog = (rows as any[])[0];
    if (!blog) throw new NotFoundException('Blog not found');
    return this.normalizeRows([blog])[0];
  }

  async create(data: BlogDto) {
    const baseSlug = this.slugify(data.title);
    if (!baseSlug) {
      throw new Error('title must include letters or numbers');
    }
    const slug = await this.ensureUniqueSlug(baseSlug);
    const [result] = await this.pool.query(
      `INSERT INTO blogs (slug, title, cover_image, short_description, content_html, is_published)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        slug,
        data.title,
        data.coverImage || null,
        data.shortDescription || null,
        data.contentHtml || null,
        data.isPublished ?? true,
      ],
    );
    // @ts-ignore mysql insert id
    const id = Number(result.insertId);
    const [rows] = await this.pool.query(
      `SELECT id, slug, title, cover_image AS coverImage, short_description AS shortDescription,
              content_html AS contentHtml, is_published, created_at AS createdAt, updated_at AS updatedAt
       FROM blogs WHERE id = ?`,
      [id],
    );
    return this.normalizeRows(rows as any[])[0];
  }

  async update(id: number, data: BlogDto) {
    const baseSlug = this.slugify(data.title);
    if (!baseSlug) {
      throw new Error('title must include letters or numbers');
    }
    const slug = await this.ensureUniqueSlug(baseSlug, id);
    await this.pool.query(
      `UPDATE blogs
       SET slug = ?, title = ?, cover_image = ?, short_description = ?, content_html = ?, is_published = ?
       WHERE id = ?`,
      [
        slug,
        data.title,
        data.coverImage || null,
        data.shortDescription || null,
        data.contentHtml || null,
        data.isPublished ?? true,
        id,
      ],
    );
    const [rows] = await this.pool.query(
      `SELECT id, slug, title, cover_image AS coverImage, short_description AS shortDescription,
              content_html AS contentHtml, is_published, created_at AS createdAt, updated_at AS updatedAt
       FROM blogs WHERE id = ?`,
      [id],
    );
    const blog = this.normalizeRows(rows as any[])[0];
    if (!blog) throw new NotFoundException('Blog not found');
    return blog;
  }

  async remove(id: number) {
    await this.pool.query('DELETE FROM blogs WHERE id = ?', [id]);
    return { success: true };
  }
}

