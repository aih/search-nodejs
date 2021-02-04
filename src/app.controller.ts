import { Controller, Get, Query } from '@nestjs/common';
import { ElasticService } from './elastic/elastic.service';

@Controller()
export class AppController {
  constructor(private readonly elasticService: ElasticService) {}

  @Get('/search?:query')
  search(@Query('q') query: string) {
    return query;
  }
}
