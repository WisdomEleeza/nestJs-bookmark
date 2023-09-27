import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
// creating the logic to connect to the database
@Injectable()
export class PrismaService extends PrismaClient {
  constructor(private config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
    // console.log(config.get('DATABASE_URL'));    npm i --save-dev prisma@latest @prisma/client@latest
  }
}
