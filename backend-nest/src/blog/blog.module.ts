import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogPublicController } from './blog-public.controller';
import { BlogService } from './blog.service';
import { DbModule } from '../db/db.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DbModule, AuthModule],
  controllers: [BlogController, BlogPublicController],
  providers: [BlogService],
})
export class BlogModule {}

