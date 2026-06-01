import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import express from 'express';

// Load .env from backend-nest root before any module (so SMTP_* etc. are in process.env)
import { config as loadEnv } from 'dotenv';
const envPath = join(__dirname, '..', '.env');
const result = loadEnv({ path: envPath, override: true });
if (result.error) {
  console.warn('[dotenv] Could not load .env:', envPath, result.error.message);
} else if (result.parsed) {
  console.log('[dotenv] Loaded', envPath, '| SMTP_HOST:', result.parsed.SMTP_HOST ? 'set' : 'missing', '| SMTP_PASS:', result.parsed.SMTP_PASS ? 'set (' + String(result.parsed.SMTP_PASS).length + ' chars)' : 'missing');
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  const corsOrigin = config.get<string>('CORS_ORIGIN', 'https://intellectchoice.co.nz');
  const port = config.get<number>('PORT', 5001);

  app.use(cookieParser());
  app.enableCors({
    origin: corsOrigin,
    credentials: true,
  });
  app.use('/uploads', express.static(join(process.cwd(), 'uploads')));

  await app.listen(port);
}
bootstrap();
