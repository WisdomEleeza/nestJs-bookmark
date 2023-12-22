import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

// This app.module.ts is the main or global module that imports other modules
// Modules organise your apps 

// after we create the AuthModule we have to export it to app.module.ts which is the global module
// that import other modules

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    BookmarkModule,
    PrismaModule,
  ],
})
export class AppModule {}
