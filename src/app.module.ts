import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigModule } from '@nestjs/config';
import config from './config/app.config';
import { ElasticConnectionService } from './elastic/elastic-connect/elastic-connection.service';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true, isGlobal: true, load: [config] }),
    ElasticsearchModule.registerAsync({ useClass: ElasticConnectionService }),
  ],
  controllers: [AppController],
  providers: [ElasticConnectionService],
})
export class AppModule {}
