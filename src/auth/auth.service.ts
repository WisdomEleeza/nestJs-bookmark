import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as argon2 from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

// providers or service are responsible for handling business logic
// With the service we use the decorator @Injectable to indicate that it is Injectable

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: AuthDto) {
    // generate password hash
    const hashedPassword = await argon2.hash(dto.password);
    // save user in the database // this is prisma

    try {
      const user = await this.prisma.user.create({ 
        data: {
          email: dto.email,
          hashedPassword,
        },
      });

      // Remove the hashedPassword property from the user object
      // delete user.hashedPassword;

      // return the saved user
      return this.signToken(user.id, user.email);
      // return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    // find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    // if user does not exist, throw an exception
    if (!user) throw new ForbiddenException('Credentials Incorrect');
    // compare password
    const passwordMatches = await argon2.verify(
      user.hashedPassword,
      dto.password,
    );
    // if the password is incorrect, throw an exception
    if (!passwordMatches) throw new ForbiddenException('Credentials Incorrect');
    // send back the user
    // delete user.hashedPassword;
    return this.signToken(user.id, user.email);
  }

  // jwt token generation
  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
