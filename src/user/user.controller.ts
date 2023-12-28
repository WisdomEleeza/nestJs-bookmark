import { Controller, Get, UseGuards } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import JwtGuard from '../auth/guard/jwt.guard';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';

// controllers are responsible for handling incoming response and request ...

@Controller('users')
// endpoint: /users/me
export class UserController {
  // @UseGuards(AuthGuard('jwt')) instead of doing it like this, we rather create custom guard called JwtGuard
  @UseGuards(JwtGuard)
  @Get('me')
  // getMe(@Req() req: Express.Request) {
  //   return req.user;
  // } instead of this method we create custom decorator to handle it and use it everywhere in the code where it is needed
  getMe(@GetUser() user: User) {
    return user;
  }
}
