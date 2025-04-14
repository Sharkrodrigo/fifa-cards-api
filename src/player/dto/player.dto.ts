import { ApiProperty } from '@nestjs/swagger';

export class PlayerStatsDto {
  @ApiProperty({ description: 'Velocidade do jogador', example: 91 })
  pac: number;

  @ApiProperty({ description: 'Finalização do jogador', example: 85 })
  sho: number;

  @ApiProperty({ description: 'Passe do jogador', example: 86 })
  pas: number;

  @ApiProperty({ description: 'Drible do jogador', example: 94 })
  dri: number;

  @ApiProperty({ description: 'Defesa do jogador', example: 36 })
  def: number;

  @ApiProperty({ description: 'Físico do jogador', example: 68 })
  phy: number;
}

export class CreatePlayerDto {
  @ApiProperty({ description: 'Nome do jogador', example: 'Neymar Jr' })
  nome: string;

  @ApiProperty({ description: 'URL da foto do jogador', example: 'https://example.com/neymar.jpg' })
  fotourl: string;

  @ApiProperty({ description: 'Posição do jogador', example: 'CAM' })
  posicao: string;

  @ApiProperty({ description: 'Avaliação geral do jogador', example: 91 })
  overall: number;

  @ApiProperty({
    description: 'Estatísticas do jogador',
    type: PlayerStatsDto
  })
  stats: PlayerStatsDto;

  @ApiProperty({
    description: 'ID do usuário dono do jogador',
    example: 1,
  })
  usuarioId: number;
}

export class UpdatePlayerDto extends CreatePlayerDto {}
