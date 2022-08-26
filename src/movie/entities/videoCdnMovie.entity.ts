import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('videoCdnMovies')
export class VideoCdnMovieEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  title: string;

  @Column({
    nullable: true,
  })
  kp_id: string;

  @Column({
    nullable: true,
  })
  imdb_id: string;

  @Column({
    nullable: true,
  })
  world_art_id: string;

  @Column({
    nullable: true,
  })
  type: string;

  @Column({
    nullable: true,
  })
  add: string;

  @Column({
    nullable: true,
  })
  orig_title: string;

  @Column({
    nullable: true,
  })
  year: string;

  @Column('varchar', {
    nullable: true,
    array: true,
  })
  translations: string[];

  @Column({
    nullable: true,
  })
  quality: string;

  @Column({
    nullable: true,
  })
  translation: string;

  @Column({
    nullable: true,
  })
  update: string;

  @Column({
    nullable: true,
  })
  iframe_src: string;
}
