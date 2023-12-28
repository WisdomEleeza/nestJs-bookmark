import { Controller, Get, UseGuards, Req } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import JwtGuard from '../auth/guard/jwt.guard'

// controllers are responsible for handling incoming response and request ...

@Controller('users')
// endpoint: /users/me
export class UserController {
  // @UseGuards(AuthGuard('jwt')) instead of doing it like this, we rather create custom guard called JwtGuard
  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@Req() req: Express.Request) {
    return req.user;
  }
}
