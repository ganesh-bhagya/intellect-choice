import { Controller, Get } from '@nestjs/common';
import { JobService } from './job.service';

@Controller('api')
export class JobPublicController {
  constructor(private readonly service: JobService) {}

  @Get('jobs')
  async list() {
    const jobs = await this.service.findActive();
    return { jobs };
  }
}
