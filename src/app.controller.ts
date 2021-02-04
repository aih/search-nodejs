import { Controller, Get, Query } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { builtinModules } from 'module';

@Controller()
export class AppController {
  constructor(private readonly elasticService: ElasticsearchService) {}

  // https://coralogix.com/log-analytics-blog/42-elasticsearch-query-examples-hands-on-tutorial/

  // https://wanago.io/2020/09/07/api-nestjs-elasticsearch/

  @Get('/search')
  async search(@Query('q') text: string) {
    const { body } = await this.elasticService.search({
      body: {
        query: {
          multi_match: {
            query: text,
            fields: ['heading', 'text', 'xml'],
          },
        },
      },
    });

    return body.hits;
  }
}
