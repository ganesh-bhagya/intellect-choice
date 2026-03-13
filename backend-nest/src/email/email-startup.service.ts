import { Injectable, OnModuleInit } from '@nestjs/common';
import { EmailService } from './email.service';

@Injectable()
export class EmailStartupService implements OnModuleInit {
  constructor(private readonly emailService: EmailService) {}

  async onModuleInit() {
    await this.emailService.verifyConnection();
  }
}
