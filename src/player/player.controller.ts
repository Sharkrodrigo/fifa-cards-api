import { Controller, Get, Post, Body, Param, Res, Put, Delete, NotFoundException } from '@nestjs/common';
import { PlayerService } from './player.service';
import { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { Player } from './player';
import { CreatePlayerDto, UpdatePlayerDto } from './dto/player.dto';

@ApiTags('players')
@Controller('players')
export class PlayerController {
  constructor(private readonly service: PlayerService) {}

  @ApiOperation({ summary: 'Listar todos os jogadores' })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de jogadores retornada com sucesso',
    type: Player,
    isArray: true
  })
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @ApiOperation({ summary: 'Obter um jogador pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do jogador' })
  @ApiResponse({ 
    status: 200, 
    description: 'Jogador encontrado com sucesso',
    type: Player
  })
  @ApiResponse({ status: 404, description: 'Jogador não encontrado' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @ApiOperation({ summary: 'Criar um novo jogador' })
  @ApiBody({ type: CreatePlayerDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Jogador criado com sucesso',
    type: Player
  })
  @Post()
  create(@Body() data: CreatePlayerDto) {
    return this.service.create(data, data.usuarioId);
  }

  @ApiOperation({ summary: 'Atualizar um jogador existente' })
  @ApiParam({ name: 'id', description: 'ID do jogador' })
  @ApiBody({ type: UpdatePlayerDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Jogador atualizado com sucesso'
  })
  @ApiResponse({ status: 404, description: 'Jogador não encontrado' })
  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdatePlayerDto) {
    return this.service.update(+id, data);
  }

  @ApiOperation({ summary: 'Excluir um jogador' })
  @ApiParam({ name: 'id', description: 'ID do jogador' })
  @ApiResponse({ 
    status: 200, 
    description: 'Jogador excluído com sucesso'
  })
  @ApiResponse({ status: 404, description: 'Jogador não encontrado' })
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }

  @ApiOperation({ summary: 'Obter o HTML do card do jogador' })
  @ApiParam({ name: 'id', description: 'ID do jogador' })
  @ApiResponse({ 
    status: 200, 
    description: 'HTML do card retornado com sucesso',
    content: {
      'text/html': {
        schema: {
          type: 'string',
          example: '<html>...</html>'
        }
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Jogador não encontrado' })
  @Get(':id/card-html')
  async getCardHtml(@Param('id') id: string, @Res() res: Response) {
    const player = await this.service.findOne(+id);
    const html = await this.service.renderHtml(player);
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  }

  @ApiOperation({ summary: 'Obter a imagem do card do jogador' })
  @ApiParam({ name: 'id', description: 'ID do jogador' })
  @ApiResponse({ 
    status: 200, 
    description: 'Imagem do card retornada com sucesso',
    content: {
      'image/png': {
        schema: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Jogador não encontrado' })
  @Get(':id/card')
  async getCardImage(@Param('id') id: string, @Res() res: Response) {
    const player = await this.service.findOne(+id);
    const buffer = await this.service.gerarCardImagem(player);
    res.setHeader('Content-Type', 'image/png');
    res.send(buffer);
  }
}
