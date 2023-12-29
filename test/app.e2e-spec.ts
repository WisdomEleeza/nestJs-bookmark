import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum' // pactum is a request making library
import { PrismaService } from '../src/prisma/prisma.service';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();

    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
  });

  afterAll(async () => {
    app.close();
  });

  describe('Auth', () => {
    describe('Signup', () => {
      test.todo('should signup')
    });
    describe('Signin', () => {
      test.todo('should signin')
    });
  });

  describe('User', () => {
    describe('Get me', () => {});
    describe('Edit user', () => {});
  });

  describe('Bookmark', () => {
    describe('Create Bookmark', () => {});
    describe('Get Bookmark', () => {});
    describe('Get Bookmark By Id', () => {});
    describe('Edit Bookmark', () => {});
    describe('Delete Bookmark', () => {});
  });
});
