import { TokenService } from './../auth/token.service';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entity';
import { VideoCdnMovieEntity } from './entities/videoCdnMovie.entity';
import { AuthMiddleware } from 'src/auth/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity, VideoCdnMovieEntity])],
  controllers: [MovieController],
  providers: [MovieService, TokenService],
})
export class MovieModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(MovieModule);
  }
}
