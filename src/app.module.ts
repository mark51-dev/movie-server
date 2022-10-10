import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { MovieModule } from './movie/movie.module';

const POSTGRES_USER = process.env.POSTGRES_USER;
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
const POSTGRES_DB = process.env.POSTGRES_DB;

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'dest'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      // username: POSTGRES_USER,
      // password: POSTGRES_PASSWORD,
      // database: POSTGRES_DB,
      username: 'postgres',
      password: 'Couj9boa',
      database: 'funmovie',
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: true,
    }),
    MovieModule,
    AuthModule,
    AdminModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
