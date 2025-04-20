import {
  Controller,
  Get,
  Post,
  Param,
  Res,
  Body,
  UploadedFile,
  UseInterceptors,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UploadService } from './upload.service';
import { Response } from 'express';
import * as path from 'path';

@Controller('documents')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
    }),
  }))
  async handleUpload(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    return this.uploadService.processUpload(file, body);
  }

  @Get()
  async getAllDocuments() {
    return this.uploadService.findAll();
  }

  @Get(':filename')
  async getMetadataWithDownloadUrl(@Param('filename') filename: string) {
    const doc = await this.uploadService.findByFilename(filename);

    if (!doc) {
      throw new NotFoundException('Documento não encontrado');
    }

    return {
      ...doc,
      downloadUrl: `http://localhost:3001/documents/download/${doc.filename}`,
    };
  }

  @Get('download/:filename')
  async download(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = path.resolve(`./uploads/${filename}`);
    res.download(filePath);
  }
}
