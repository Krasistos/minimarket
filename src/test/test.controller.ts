import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from 'src/s3/s3.service';

@Controller('test')
export class TestController {
    constructor(private readonly s3Service: S3Service) { }

    @Post('upload')
    @ApiOperation({ summary: 'Upload an image to S3' })
    @ApiConsumes('multipart/form-data') // Indicates multipart/form-data for file upload
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                image: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @UseInterceptors(FileInterceptor('image')) // 'image' should match the form-data key
    async uploadImage(@UploadedFile() file: Express.Multer.File) {
        // Here, file.buffer is the uploaded file data
        const imageUrl = await this.s3Service.uploadFile(
            `test/${Date.now()}.${file.originalname.split('.').pop()}`,
            file.buffer,
            file.mimetype,
        );
        return { imageUrl };
    }
}
