import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { ArchivematicaModule } from './archivematica/archivematica.module';

@Module({
  imports: [
    AuthModule,
    ArchivematicaModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
