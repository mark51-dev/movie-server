import { UserDto } from './dto/user.dto';
import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenService {
  generateTokens(userDto: any) {
    const accessToken = jwt.sign(userDto, 'secretkey', { expiresIn: '10s' });
    const refreshToken = jwt.sign(userDto, 'secretkey2', { expiresIn: '15s' });
    return { accessToken, refreshToken };
  }

  validateRefreshToken(refreshToken: string) {
    try {
      const token = jwt.verify(refreshToken, 'secretkey2');
      return token;
    } catch (e) {
      return null;
    }
  }

  validateAccessToken(successToken: string) {
    try {
      const token = jwt.verify(successToken, 'secretkey');
      return token;
    } catch (e) {
      return null;
    }
  }
}
