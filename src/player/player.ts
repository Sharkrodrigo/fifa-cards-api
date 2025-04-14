import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

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
      phy: 68
    }
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
}
