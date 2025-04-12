import { Test, TestingModule } from '@nestjs/testing';
import { InventarLogService } from './inventar-log.service';

describe('InventarLogService', () => {
  let service: InventarLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventarLogService],
    }).compile();

    service = module.get<InventarLogService>(InventarLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
