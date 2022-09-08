import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokenService {
  generateTokens(userDto: any) {
    const accessToken = jwt.sign(userDto, 'secretkey', { expiresIn: '15m' });
    const refreshToken = jwt.sign(userDto, 'secretkey2', { expiresIn: '30d' });
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
