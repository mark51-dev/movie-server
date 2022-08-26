import { TokenService } from './token.service';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly tokenService: TokenService) {}
  use(req: any, res: any, next: () => void) {
    try {
      const authorizationHeader = req.headers.authorization;
      if (!authorizationHeader) {
        throw new HttpException(`Unauthorized user`, HttpStatus.UNAUTHORIZED);
      }
      const accessToken = authorizationHeader.split(' ')[1];
      if (!accessToken) {
        throw new HttpException(`Unauthorized user`, HttpStatus.UNAUTHORIZED);
      }

      const validUser = this.tokenService.validateAccessToken(accessToken);
      req.user = validUser;
      next();
    } catch (e) {
      throw new HttpException(`Unauthoeized user`, HttpStatus.UNAUTHORIZED);
    }
  }
}
