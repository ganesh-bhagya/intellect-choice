import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { DbModule } from '../db/db.module';
import { EmailModule } from '../email/email.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DbModule, EmailModule, AuthModule],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}

