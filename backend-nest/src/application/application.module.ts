import { Module } from '@nestjs/common';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { DbModule } from '../db/db.module';
import { EmailModule } from '../email/email.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DbModule, EmailModule, AuthModule],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule {}

