import { ClientOptions } from '@elastic/elasticsearch';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ElasticsearchOptionsFactory } from '@nestjs/elasticsearch';

@Injectable()
export class ElasticConnectionService implements ElasticsearchOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createElasticsearchOptions(): ClientOptions | Promise<ClientOptions> {
    const elasticUrl = this.configService.get<string>('elasticUrl');

    return {
      node: elasticUrl,
    };
  }
}
