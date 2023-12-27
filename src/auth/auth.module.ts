import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';
import { PrismaModule } from 'src/prisma/prisma.module';

// @Module is a decorator which must be import from @nestjs/common
// after we create the AuthModule we have to export it to app.module.ts which is the global module
// that import other modules

// controllers are imported into controllers
// services are import into the providers
@Module({
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
