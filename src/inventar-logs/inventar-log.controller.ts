import { Controller, Get } from '@nestjs/common';
import { InventarLogService } from './inventar-log.service';

@Controller('inventar-logs')
export class InventarLogController {

    constructor(private readonly inventarLogService:InventarLogService) {
        
    }

    @Get()
    async getInventarLogs(){
        return this.inventarLogService.getInvetarLogs();
    }
}
