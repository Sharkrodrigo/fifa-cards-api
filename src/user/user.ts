import { Player } from 'src/player/player';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  @OneToMany(() => Player, (player) => player.user)
  jogadores: Player[]; // Relacionamento com a entidade de jogadores
}
