import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    AuthModule,
    UploadModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
