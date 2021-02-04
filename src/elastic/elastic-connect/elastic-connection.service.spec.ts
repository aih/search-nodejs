import { Test, TestingModule } from '@nestjs/testing';
import { ElasticConnectionService } from './elastic-connection.service';

describe('ElasticConnectionService', () => {
  let service: ElasticConnectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ElasticConnectionService],
    }).compile();

    service = module.get<ElasticConnectionService>(ElasticConnectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
