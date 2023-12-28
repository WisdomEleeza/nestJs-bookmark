// custom guard for jwt
// we will use JwtGuard inside the UserController

import { AuthGuard } from '@nestjs/passport';

class JwtGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
}

export default JwtGuard
