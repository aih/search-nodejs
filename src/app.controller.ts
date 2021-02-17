import { Controller, Get, Query } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Controller()
export class AppController {

  constructor(private readonly elasticService: ElasticsearchService) {

  }


  // https://coralogix.com/log-analytics-blog/42-elasticsearch-query-examples-hands-on-tutorial/

  // https://wanago.io/2020/09/07/api-nestjs-elasticsearch/

  @Get('/search')
  async search(@Query() params) {
    const DEFAULT_FIELDS = ['text', 'title', 'number'];
    const DEFAULT_FIELD = 'text';
    const DEFAULT_INDEX ='uscsections'; 
    let elQuery = {};

    if(params.mode && params.mode.toLowerCase()=='querystring'){
      elQuery = {
        index: params.index || DEFAULT_INDEX,
        body: {
          size: 10,
          query: {
            query_string: {
              query: params.q,
              default_field: DEFAULT_FIELD,
            },
          },
          highlight: {
            'fields': { 'text': {} },
          },
        },
      };

    } else {
      elQuery = {
        index: params.index || DEFAULT_INDEX,
        body: {
          from: params._from || 0,
          size: 10,
          query: {
            multi_match: {
              query: params.q,
              fields: params.searchBy || DEFAULT_FIELDS ,
            },
          },
          highlight: {
            'fields': { 'text': {} },
          },
        },
      };
    }

    const { body } = await this.elasticService.search(elQuery);

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
