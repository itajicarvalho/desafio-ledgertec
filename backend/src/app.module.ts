import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { DocumentModule } from './document/document.module';

@Module({
  imports: [
    AuthModule,
    DocumentModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
