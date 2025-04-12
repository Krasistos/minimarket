import { Test, TestingModule } from '@nestjs/testing';
import { InventarLogController } from './inventar-log.controller';

describe('InventarLogController', () => {
  let controller: InventarLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventarLogController],
    }).compile();

    controller = module.get<InventarLogController>(InventarLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
