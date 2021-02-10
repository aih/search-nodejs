import { Controller, Get, Query } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Controller()
export class AppController {

  constructor(private readonly elasticService: ElasticsearchService) {

  }

  // https://coralogix.com/log-analytics-blog/42-elasticsearch-query-examples-hands-on-tutorial/

  // https://wanago.io/2020/09/07/api-nestjs-elasticsearch/

  @Get('/search')
  async search(@Query('q') text: string, @Query('_from') from: number) {
    const { body } = await this.elasticService.search({
      body: {
        from: from || 0,
        size: 10,
        query: {
          multi_match: {
            query: text,
            fields: ['heading', 'text', 'xml'],
          }
        },
        highlight: {
            "fields": { "text": {} }
          }
        },
    });

    return body.hits;
  }

/*  @Get('/delete')
  async delete(@Query('index') index: string) {
    await this.elasticService.indices.delete({
      index,
    });
    return 'done';
  }*/

}
