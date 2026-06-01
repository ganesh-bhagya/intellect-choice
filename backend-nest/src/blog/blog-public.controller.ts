import { Controller, Get, Param, Query } from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller('api')
export class BlogPublicController {
  constructor(private readonly service: BlogService) {}

  @Get('blogs')
  async list(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    const blogs = await this.service.findAllPublic(Number(limit || 50), Number(offset || 0));
    return { blogs };
  }

  @Get('blogs/:slug')
  async one(@Param('slug') slug: string) {
    const blog = await this.service.findOnePublicBySlug(slug);
    return { blog };
  }
}

