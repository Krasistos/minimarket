
import { ApiProperty } from '@nestjs/swagger';
import { LogType } from '@prisma/client';

export class CreateInventarLogDto {
    @ApiProperty()
    product_id: number;

    @ApiProperty()
    quantity: number;

    @ApiProperty({ enum: LogType, description: 'Type of log: ORDERS or SELLS' })
    type: LogType;

    @ApiProperty()
    created_at: Date; // Date and time when the log was created

    @ApiProperty()
    updated_at: Date; // Date and time when the log was last updated

}
