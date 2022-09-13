import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { TokenService } from './token.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
    private readonly tokenService: TokenService,
  ) {}

  async createUser(userDto: UserDto) {
    const user = await this.userEntityRepository.findOneBy({
      email: userDto.email,
    });
    if (user) {
      throw new HttpException(`User already exist`, HttpStatus.CONFLICT);
    }

    const accessAndRefreshTokens = this.tokenService.generateTokens({
      email: userDto.email,
    });
    const userRes = await this.userEntityRepository.create({
      email: userDto.email,
      username: userDto.username,
      password: bcrypt.hashSync(userDto.password, 3),
      refreshToken: accessAndRefreshTokens.refreshToken,
    });
    const createdUser = await this.userEntityRepository.save(userRes);
    delete createdUser.refreshToken;
    return {
      user: createdUser,
      tokens: accessAndRefreshTokens,
    };
  }

  async login(userDto: UserDto) {
    const user = await this.userEntityRepository.findOneBy({
      email: userDto.email,
    });

    if (!user) {
      throw new HttpException(`User not found`, HttpStatus.BAD_REQUEST);
    }

    const isPasswordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );

    if (!isPasswordEquals) {
      throw new HttpException(`Password is incorrect`, HttpStatus.BAD_REQUEST);
    }

    const accessAndRefreshTokens = this.tokenService.generateTokens({
      email: userDto.email,
    });

    await this.userEntityRepository.update(
      {
        email: user.email,
      },
      {
        refreshToken: accessAndRefreshTokens.refreshToken,
      },
    );

    return {
      accessToken: accessAndRefreshTokens.accessToken,
      refreshToken: accessAndRefreshTokens.refreshToken,
    };
  }

  async refresh(token: any) {
    const user = await this.userEntityRepository.findOneBy({
      refreshToken: token.refreshToken,
    });
    const validRefreshToken = this.tokenService.validateRefreshToken(
      token.refreshToken,
    );
    if (!user || !validRefreshToken) {
      throw new HttpException(`Unauthorized user`, HttpStatus.UNAUTHORIZED);
    }

    const validUser = await this.userEntityRepository.findOneBy({
      email: validRefreshToken.email,
    });

    const accessAndRefreshTokens = this.tokenService.generateTokens({
      email: validUser.email,
    });

    await this.userEntityRepository.update(
      {
        email: validUser.email,
      },
      {
        refreshToken: accessAndRefreshTokens.refreshToken,
      },
    );

    return {
      tokens: accessAndRefreshTokens,
    };
  }

  async logout(token: UserDto) {
    const user = await this.userEntityRepository.findOneBy({
      refreshToken: token.refreshToken,
    });
    if (!user) {
      throw new HttpException(`Unauthorized user`, HttpStatus.UNAUTHORIZED);
    }

    await this.userEntityRepository.update(
      {
        email: user.email,
      },
      {
        refreshToken: '',
      },
    );
    return {
      logout: true,
    };
  }
}
