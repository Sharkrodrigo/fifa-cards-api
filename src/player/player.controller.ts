// src/player/player.controller.ts
import { Controller, Get, Post, Body, Param, Res, Put, Delete, NotFoundException } from '@nestjs/common';
import { PlayerService } from './player.service';
import { Response } from 'express';

@Controller('players')
export class PlayerController {
  constructor(private readonly service: PlayerService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Post()
  create(@Body() data) {
    return this.service.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data) {
    return this.service.update(+id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }

  @Get(':id/card-html')
async getCardHtml(@Param('id') id: string, @Res() res: Response) {
  const player = await this.service.findOne(+id);
  if (!player) throw new NotFoundException(`Player com ID ${id} não encontrado`);

  const html = await this.service.renderHtml(player);
  res.setHeader('Content-Type', 'text/html');
  res.send(html);
}

@Get(':id/card')
async getCardImage(@Param('id') id: string, @Res() res: Response) {
  const player = await this.service.findOne(+id);
  if (!player) throw new NotFoundException(`Player com ID ${id} não encontrado`);

  const buffer = await this.service.gerarCardImagem(player);
  res.setHeader('Content-Type', 'image/png');
  res.send(buffer);
}
}
