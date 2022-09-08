import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { VideoCdnMovieEntity } from './videoCdnMovie.entity';

@Entity('movies')
export class MovieEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  kinopoiskId: number;

  @Column({
    nullable: true,
  })
  imdbId: string;

  @Column({
    nullable: true,
  })
  nameRu: string;

  @Column({
    nullable: true,
  })
  nameEn: string;

  @Column({
    nullable: true,
  })
  nameOriginal: string;

  @Column({
    nullable: true,
  })
  posterUrl: string;

  @Column({
    nullable: true,
  })
  posterUrlPreview: string;

  @Column({
    nullable: true,
  })
  coverUrl: string;

  @Column({
    nullable: true,
  })
  logoUrl: string;

  @Column({
    nullable: true,
  })
  reviewsCount: number;

  @Column({
    type: 'float',
    nullable: true,
  })
  ratingGoodReview: number;

  @Column({
    nullable: true,
  })
  ratingGoodReviewVoteCount: number;

  @Column({
    type: 'float',
    nullable: true,
  })
  ratingKinopoisk: number;

  @Column({
    nullable: true,
  })
  ratingKinopoiskVoteCount: number;

  @Column({
    type: 'float',
    nullable: true,
  })
  ratingImdb: number;

  @Column({
    type: 'float',
    nullable: true,
  })
  ratingImdbVoteCount: number;

  @Column({
    type: 'float',
    nullable: true,
  })
  ratingFilmCritics: number;

  @Column({
    type: 'float',
    nullable: true,
  })
  ratingFilmCriticsVoteCount: number;

  @Column({
    type: 'float',
    nullable: true,
  })
  ratingAwait: number;

  @Column({
    nullable: true,
  })
  ratingAwaitCount: number;

  @Column({
    type: 'float',
    nullable: true,
  })
  ratingRfCritics: number;

  @Column({
    nullable: true,
  })
  ratingRfCriticsVoteCount: number;

  @Column({
    nullable: true,
  })
  webUrl: string;

  @Column({
    nullable: true,
  })
  year: number;

  @Column({
    nullable: true,
  })
  filmLength: number;

  @Column({
    nullable: true,
  })
  slogan: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column({
    nullable: true,
  })
  shortDescription: string;

  @Column({
    nullable: true,
  })
  editorAnnotation: string;

  @Column({
    nullable: true,
  })
  isTicketsAvailable: boolean;

  @Column({
    nullable: true,
  })
  productionStatus: string;

  @Column({
    nullable: true,
  })
  type: string;

  @Column({
    nullable: true,
  })
  ratingMpaa: string;

  @Column({
    nullable: true,
  })
  ratingAgeLimits: string;

  @Column('varchar', {
    nullable: true,
    array: true,
  })
  countries: string[];

  @Column('varchar', {
    nullable: true,
    array: true,
  })
  genres: string[];

  @Column({
    nullable: true,
  })
  startYear: number;

  @Column({
    nullable: true,
  })
  endYear: number;

  @Column({
    nullable: true,
  })
  serial: boolean;

  @Column({
    nullable: true,
  })
  shortFilm: boolean;

  @Column({
    nullable: true,
  })
  completed: boolean;

  @Column({
    nullable: true,
  })
  hasImax: boolean;

  @Column({
    nullable: true,
  })
  has3D: boolean;

  @Column({
    nullable: true,
  })
  lastSync: Date;

  @OneToOne(() => VideoCdnMovieEntity, { eager: true, cascade: true })
  @JoinColumn()
  videoCdnMovie: VideoCdnMovieEntity;
}
