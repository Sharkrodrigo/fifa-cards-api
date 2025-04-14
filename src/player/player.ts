import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  fotourl: string;

  @Column()
  posicao: string;

  @Column()
  overall: number;

  @Column('json')
  stats: {
    pac: number;
    sho: number;
    pas: number;
    dri: number;
    def: number;
    phy: number;
  };
}