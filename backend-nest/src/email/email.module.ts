import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmailService } from './email.service';
import { EmailStartupService } from './email-startup.service';

@Module({
  imports: [ConfigModule],
  providers: [EmailService, EmailStartupService],
  exports: [EmailService],
})
export class EmailModule {}
