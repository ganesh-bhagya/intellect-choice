import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { mkdirSync } from 'fs';
import { BlogService, type BlogDto } from './blog.service';
import { AdminGuard } from '../auth/admin.guard';

@UseGuards(AdminGuard)
@Controller('api/admin/blogs')
export class BlogController {
  constructor(private readonly service: BlogService) {}

  @Get()
  async list() {
    const blogs = await this.service.findAllAdmin();
    return { blogs };
  }

  @Post('upload-image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: (_req, _file, cb) => {
          const dir = './uploads/blogs';
          mkdirSync(dir, { recursive: true });
          cb(null, dir);
        },
        filename: (_req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname).toLowerCase());
        },
      }),
      limits: { fileSize: 8 * 1024 * 1024 },
      fileFilter: (_req, file, cb) => {
        const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
        if (allowed.includes(file.mimetype)) return cb(null, true);
        cb(new Error('Only JPG, PNG, or WEBP images are allowed.'), false);
      },
    }),
  )
  async uploadImage(@UploadedFile() file?: any) {
    if (!file) return { error: 'image file is required' };
    return { success: true, imagePath: `/uploads/blogs/${file.filename}` };
  }

  @Post()
  async create(@Body() body: BlogDto) {
    const blog = await this.service.create(body);
    return { blog };
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: BlogDto) {
    const blog = await this.service.update(id, body);
    return { blog };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}

