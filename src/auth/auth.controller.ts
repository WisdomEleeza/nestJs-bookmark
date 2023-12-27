import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

// controllers are responsible for handling incoming response and request ...

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {} // Dependecy Injection

  // /auth/signup
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    // console.log({ dto });
    return this.authService.signup(dto)
  }

  // /auth/signin
  @Post('/signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}
