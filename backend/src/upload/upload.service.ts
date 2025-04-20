import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UploadService {
  constructor(private prisma: PrismaService) {}

  async processUpload(file: Express.Multer.File, body: any) {
    if (!file) throw new Error('Arquivo não encontrado');

    const { author, category } = body;

    const doc = await this.prisma.document.create({
      data: {
        filename: file.filename,
        author,
        category,
        type: file.mimetype,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      },
    });

    return { message: 'Documento salvo!', doc };
  }

  async findAll() {
    return this.prisma.document.findMany();
  }

  async findByFilename(filename: string) {
    return this.prisma.document.findUnique({
      where: { filename },
    });
  }
  
}
