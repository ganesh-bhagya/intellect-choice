import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { EmailModule } from './email/email.module';
import { AuthModule } from './auth/auth.module';
import { ContactModule } from './contact/contact.module';
import { ApplicationModule } from './application/application.module';
import { JobModule } from './job/job.module';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(__dirname, '..', '.env'),
    }),
    DbModule,
    EmailModule,
    AuthModule,
    ContactModule,
    ApplicationModule,
    JobModule,
    BlogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
