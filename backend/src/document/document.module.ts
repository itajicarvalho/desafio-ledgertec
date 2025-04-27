import { Module } from '@nestjs/common';
import { DocumentController } from './document.controller';
import { UploadService } from './document.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [DocumentController],
  providers: [UploadService, PrismaService],
})
export class UploadModule {}
