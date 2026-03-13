import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { JobPublicController } from './job-public.controller';
import { JobService } from './job.service';
import { DbModule } from '../db/db.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DbModule, AuthModule],
  controllers: [JobController, JobPublicController],
  providers: [JobService],
})
export class JobModule {}

