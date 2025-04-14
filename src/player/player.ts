import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/user';

@Entity()
export class Player {
  @ApiProperty({ description: 'ID único do jogador', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Nome do jogador', example: 'Neymar Jr' })
  @Column()
  nome: string;

  @ApiProperty({ description: 'URL da foto do jogador', example: 'https://example.com/neymar.jpg' })
  @Column()
  fotourl: string;

  @ApiProperty({ description: 'Posição do jogador', example: 'CAM' })
  @Column()
  posicao: string;

  @ApiProperty({ description: 'Avaliação geral do jogador', example: 91 })
  @Column()
  overall: number;

  @ApiProperty({
    description: 'Estatísticas do jogador',
    example: {
      pac: 91,
      sho: 85,
      pas: 86,
      dri: 94,
      def: 36,
      phy: 68,
    },
  })
  @Column('json')
  stats: {
    pac: number;
    sho: number;
    pas: number;
    dri: number;
    def: number;
    phy: number;
  };

  // Relacionamento ManyToOne com a entidade User
  @ManyToOne(() => User, (user) => user.jogadores)
  user: User; // Relacionamento com a entidade User (um jogador pertence a um usuário)
}
