import { Test, TestingModule } from '@nestjs/testing';
import { WildcardController } from './wildcard.controller';
import { WildcardService } from './wildcard.service';

describe('WildcardController', () => {
  let controller: WildcardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WildcardController],
      providers: [WildcardService],
    }).compile();

    controller = module.get<WildcardController>(WildcardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
