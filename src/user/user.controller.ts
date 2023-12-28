import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// controllers are responsible for handling incoming response and request ...

@Controller('users')
// endpoint: /users/me
export class UserController {
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getMe(@Req() req: Express.Request) {
    return req.user;
  }
}
