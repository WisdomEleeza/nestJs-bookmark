import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Apply @Global() decorator here
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
