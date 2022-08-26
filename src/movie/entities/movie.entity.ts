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
  imdbId: string | null;

  @Column({
    nullable: true,
  })
  nameRu: string | null;

  @Column({
    nullable: true,
  })
  nameEn: string | null;

  @Column({
    nullable: true,
  })
  nameOriginal: string | null;

  @Column({
    nullable: true,
  })
  posterUrl: string | null;

  @Column({
    nullable: true,
  })
  posterUrlPreview: string | null;

  @Column({
    nullable: true,
  })
  coverUrl: string | null;

  @Column({
    nullable: true,
  })
  logoUrl: string | null;

  @Column({
    nullable: true,
  })
  reviewsCount: number | null;

  @Column({
    type: 'float',
    nullable: true,
  })
  ratingGoodReview: number | null;

  @Column({
    nullable: true,
  })
  ratingGoodReviewVoteCount: number | null;

  @Column({
    type: 'float',
    nullable: true,
  })
  ratingKinopoisk: number | null;

  @Column({
    nullable: true,
  })
  ratingKinopoiskVoteCount: number | null;

  @Column({
    type: 'float',
    nullable: true,
  })
  ratingImdb: number | null;

  @Column({
    type: 'float',
    nullable: true,
  })
  ratingImdbVoteCount: number | null;

  @Column({
    type: 'float',
    nullable: true,
  })
  ratingFilmCritics: number | null;

  @Column({
    type: 'float',
    nullable: true,
  })
  ratingFilmCriticsVoteCount: number | null;

  @Column({
    type: 'float',
    nullable: true,
  })
  ratingAwait: number | null;

  @Column({
    nullable: true,
  })
  ratingAwaitCount: number | null;

  @Column({
    type: 'float',
    nullable: true,
  })
  ratingRfCritics: number | null;

  @Column({
    nullable: true,
  })
  ratingRfCriticsVoteCount: number | null;

  @Column({
    nullable: true,
  })
  webUrl: string | null;

  @Column({
    nullable: true,
  })
  year: number | null;

  @Column({
    nullable: true,
  })
  filmLength: number | null;

  @Column({
    nullable: true,
  })
  slogan: string | null;

  @Column({
    nullable: true,
  })
  description: string | null;

  @Column({
    nullable: true,
  })
  shortDescription: string | null;

  @Column({
    nullable: true,
  })
  editorAnnotation: string | null;

  @Column({
    nullable: true,
  })
  isTicketsAvailable: boolean | null;

  @Column({
    nullable: true,
  })
  productionStatus: string | null;

  @Column({
    nullable: true,
  })
  type: string | null;

  @Column({
    nullable: true,
  })
  ratingMpaa: string | null;

  @Column({
    nullable: true,
  })
  ratingAgeLimits: string | null;

  @Column('varchar', {
    nullable: true,
    array: true,
  })
  countries: string[] | null;

  @Column('varchar', {
    nullable: true,
    array: true,
  })
  genres: string[] | null;

  @Column({
    nullable: true,
  })
  startYear: number | null;

  @Column({
    nullable: true,
  })
  endYear: number | null;

  @Column({
    nullable: true,
  })
  serial: boolean | null;

  @Column({
    nullable: true,
  })
  shortFilm: boolean | null;

  @Column({
    nullable: true,
  })
  completed: boolean | null;

  @Column({
    nullable: true,
  })
  hasImax: boolean | null;

  @Column({
    nullable: true,
  })
  has3D: boolean | null;

  @Column({
    nullable: true,
  })
  lastSync: Date | null;

  @OneToOne(() => VideoCdnMovieEntity, { eager: true, cascade: true })
  @JoinColumn()
  videoCdnMovie: VideoCdnMovieEntity;
}
