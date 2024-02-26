import { Test, TestingModule } from '@nestjs/testing';
import { WildcardService } from './wildcard.service';

describe('WildcardService', () => {
  let service: WildcardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WildcardService],
    }).compile();

    service = module.get<WildcardService>(WildcardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
