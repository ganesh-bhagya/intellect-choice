import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { config as loadEnv } from 'dotenv';
import * as nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly transport: Transporter | null;

  constructor(private readonly config: ConfigService) {
    this.transport = this.createTransport();
  }

  private createTransport(): Transporter | null {
    const envPath = join(__dirname, '..', '..', '.env');
    const result = loadEnv({ path: envPath, override: true });
    const env = result.parsed ?? {};

    const host = (env.SMTP_HOST ?? process.env.SMTP_HOST ?? this.config.get<string>('SMTP_HOST'))?.trim();
    const port = Number(env.SMTP_PORT ?? process.env.SMTP_PORT ?? this.config.get<number>('SMTP_PORT') ?? 465);
    const user = (env.SMTP_USER ?? process.env.SMTP_USER ?? this.config.get<string>('SMTP_USER'))?.trim();
    const pass = (env.SMTP_PASS ?? process.env.SMTP_PASS ?? this.config.get<string>('SMTP_PASS'))?.trim();

    if (!host || !user || !pass) {
      return null;
    }

    return nodemailer.createTransport({
      host,
      port: port || 465,
      secure: (port || 465) === 465,
      auth: { user, pass },
    });
  }

  private get from(): string {
    return this.config.get<string>('EMAIL_FROM', 'Intellect Choice <contact@intellectchoice.co.nz>');
  }

  private get to(): string {
    return this.config.get<string>('EMAIL_TO', 'contact@intellectchoice.co.nz');
  }

  /** Call at app startup to verify SMTP connection (used by EmailStartupService). */
  async verifyConnection(): Promise<void> {
    if (!this.transport) {
      console.log('[SMTP] Not configured at startup; contact/application emails will be skipped.');
      return;
    }
    try {
      await this.transport.verify();
      console.log('[SMTP] Connection verified at startup.');
    } catch (err: any) {
      console.warn('[SMTP] Connection check failed at startup:', err?.message || err);
    }
  }

  async sendContactNotification(data: {
    name: string;
    email: string;
    phone?: string;
    message: string;
  }): Promise<void> {
    if (!this.transport) {
      console.log('[Email] SMTP not configured; contact notification skipped:', data.email);
      return;
    }
    try {
      await this.transport.sendMail({
        from: this.from,
        to: this.to,
        subject: `[Intellect Choice] New contact: ${data.name}`,
        text: [
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          data.phone ? `Phone: ${data.phone}` : '',
          '',
          data.message,
        ]
          .filter(Boolean)
          .join('\n'),
        replyTo: data.email,
      });
    } catch (err: any) {
      console.error('[Email] Failed to send contact notification:', err?.message || err);
    }
  }

  async sendApplicationNotification(data: {
    name: string;
    email: string;
    phone?: string;
    position: string;
    message?: string;
    cvOriginalName?: string | null;
  }): Promise<void> {
    if (!this.transport) {
      console.log('[Email] SMTP not configured; application notification skipped:', data.email);
      return;
    }
    try {
      await this.transport.sendMail({
        from: this.from,
        to: this.to,
        subject: `[Intellect Choice] New application: ${data.name} – ${data.position}`,
        text: [
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          data.phone ? `Phone: ${data.phone}` : '',
          `Position: ${data.position}`,
          data.cvOriginalName ? `CV: ${data.cvOriginalName}` : '',
          '',
          data.message || '(No message)',
        ]
          .filter(Boolean)
          .join('\n'),
        replyTo: data.email,
      });
    } catch (err: any) {
      console.error('[Email] Failed to send application notification:', err?.message || err);
    }
  }
}
