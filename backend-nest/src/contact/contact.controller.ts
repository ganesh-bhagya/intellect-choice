import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ContactService } from './contact.service';
import { AdminGuard } from '../auth/admin.guard';

@Controller('api')
export class ContactController {
  constructor(private readonly service: ContactService) {}

  @Post('contact')
  async create(@Body() body: { name: string; email: string; phone?: string; message: string }) {
    return this.service.create(body);
  }

  @UseGuards(AdminGuard)
  @Get('admin/contacts')
  async getAll() {
    const contacts = await this.service.findAll();
    return { contacts };
  }
}

