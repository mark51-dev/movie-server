import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entity';
import { VideoCdnMovieEntity } from './entities/videoCdnMovie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity, VideoCdnMovieEntity])],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
