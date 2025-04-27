import {
  Controller,
  Get,
  Post,
  Param,
  Res,
  Body,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { DocumentService } from './document.service';
import { Response } from 'express';
import * as path from 'path';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('documents')
export class DocumentController {
  constructor(private readonly uploadService: DocumentService) { }

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
  @Get()
  async getAllDocuments() {
    return this.uploadService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':filename')
  async getMetadataWithDownloadUrl(@Param('filename') filename: string) {
    const doc = await this.uploadService.findByFilename(filename);

    if (!doc) {
      throw new NotFoundException('Documento não encontrado');
    }

    return doc;
  }

  @UseGuards(AuthGuard)
  @Get('download/:filename')
  async download(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = path.resolve(`./uploads/${filename}`);
    res.download(filePath);
  }
}
