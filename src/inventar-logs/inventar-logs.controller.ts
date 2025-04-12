import { Body, Controller, Get, Post } from '@nestjs/common';
import { InventarLogsService } from './inventar-logs.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CreateInventarLogDto } from './dtos/create-inventar-log.dto';

@ApiTags('Inventar-logs')
@Controller('inventar-logs')
export class InventarLogsController {

    constructor(private readonly inventarLogService:InventarLogsService) {}

    @Get()
    async getInventarLogs(){
        return this.inventarLogService.getInventarLogs();
    }

    @Post('createInventarLog')
    @ApiBody({type:CreateInventarLogDto})
    async createInventarLog(
        @Body() dto: CreateInventarLogDto
    ){
        return this.inventarLogService.createInventarLog(dto);
    }
}
