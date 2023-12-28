import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Apply @Global() decorator here, this will make all the module should have access to communicate with the database 
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
