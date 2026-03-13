import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import type { Response } from 'express';
import { ApplicationService } from './application.service';
import { AdminGuard } from '../auth/admin.guard';

@Controller('api')
export class ApplicationController {
  constructor(private readonly service: ApplicationService) {}

  @Post('applications')
  @UseInterceptors(
    FileInterceptor('cv', {
      storage: diskStorage({
        destination: './uploads/cv',
        filename: (_, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  async create(
    @Body()
    body: {
      name: string;
      email: string;
      phone?: string;
      position: string;
      message?: string;
    },
    @UploadedFile() file?: any,
  ) {
    const cvPath = file ? file.path : null;
    const cvOriginalName = file ? file.originalname : null;
    return this.service.create({ ...body, cvPath, cvOriginalName });
  }

  @UseGuards(AdminGuard)
  @Get('admin/applications')
  async getAll() {
    const applications = await this.service.findAll();
    return { applications };
  }

  @UseGuards(AdminGuard)
  @Get('admin/applications/:id/cv')
  async downloadCv(@Param('id') id: string, @Res() res: Response) {
    const application = await this.service.findOne(Number(id));
    if (!application || !application.cv_path) {
      return res.status(404).send('CV not found');
    }
    return res.download(application.cv_path, application.cv_original_name || 'cv');
  }
}

