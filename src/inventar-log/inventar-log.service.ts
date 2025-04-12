import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InventarLogService {

    constructor(private readonly prismaService:PrismaService) {
        
    }

    async getInvetarLogs(){
        return this.prismaService.inventarLog.findMany();
    }
}
