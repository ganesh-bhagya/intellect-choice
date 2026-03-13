import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JobService } from './job.service';
import type { JobDto } from './job.service';
import { AdminGuard } from '../auth/admin.guard';

@UseGuards(AdminGuard)
@Controller('api/admin/jobs')
export class JobController {
  constructor(private readonly service: JobService) {}

  @Get()
  async list() {
    const jobs = await this.service.findAll();
    return { jobs };
  }

  @Post()
  async create(@Body() body: JobDto) {
    const job = await this.service.create(body);
    return { job };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: JobDto) {
    const job = await this.service.update(Number(id), body);
    return { job };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}

