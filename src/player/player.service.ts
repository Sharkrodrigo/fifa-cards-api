import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as puppeteer from 'puppeteer';
import { Player } from './player';
import { CreatePlayerDto, UpdatePlayerDto } from './dto/player.dto';

@Injectable()
export class PlayerService {
    constructor(
        @InjectRepository(Player)
        private repo: Repository<Player>,
    ) { }

    async findAll(): Promise<Player[]> {
        return this.repo.find();
    }

    async findOne(id: number): Promise<Player> {
        const player = await this.repo.findOneBy({ id });
        if (!player) {
            throw new NotFoundException(`Jogador com ID ${id} não encontrado`);
        }
        return player;
    }

    async create(data: CreatePlayerDto): Promise<Player> {
        const player = this.repo.create(data);
        return this.repo.save(player);
    }

    async update(id: number, data: UpdatePlayerDto) {
        const player = await this.findOne(id);
        if (!player) {
            throw new NotFoundException(`Jogador com ID ${id} não encontrado`);
        }
        await this.repo.update(id, data);
        return { ...player, ...data };
    }

    async delete(id: number) {
        const player = await this.findOne(id);
        if (!player) {
            throw new NotFoundException(`Jogador com ID ${id} não encontrado`);
        }
        return this.repo.delete(id);
    }

    async renderHtml(player: Player) {
        const html = `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8">
              <title>FIFA Card</title>
              <style>
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap');
                
                body {
                  margin: 0;
                  padding: 0;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  background-color: #f0f0f0;
                  font-family: 'Roboto', sans-serif;
                }
                
                .card {
                  width: 300px;
                  height: 450px;
                  background-color: #1a1a1a;
                  border-radius: 15px;
                  overflow: hidden;
                  position: relative;
                  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  padding: 20px;
                  box-sizing: border-box;
                }
                
                .overall {
                  font-size: 60px;
                  font-weight: 900;
                  color: gold;
                  text-shadow: 0 0 10px rgba(255, 215, 0, 0.7);
                  margin-top: 20px;
                  margin-bottom: 5px;
                }
                
                .posicao {
                  font-size: 24px;
                  color: white;
                  margin-bottom: 30px;
                }
                
                .player-image {
                  width: 150px;
                  height: 150px;
                  border-radius: 50%;
                  object-fit: cover;
                  border: 3px solid gold;
                  margin-bottom: 20px;
                }
                
                .nome {
                  font-size: 28px;
                  font-weight: 700;
                  color: white;
                  text-align: center;
                  margin-bottom: 20px;
                }
                
                .stats-grid {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  gap: 10px;
                  width: 100%;
                }
                
                .stat {
                  background-color: #333;
                  color: white;
                  padding: 8px 12px;
                  border-radius: 5px;
                  text-align: center;
                  font-weight: 700;
                }
              </style>
            </head>
            <body>
              <div class="card">
                <div class="overall">${player.overall}</div>
                <div class="posicao">${player.posicao}</div>
                
                <img class="player-image" src="${player.fotourl}" alt="${player.nome}" />
                
                <div class="nome">${player.nome}</div>
                
                <div class="stats-grid">
                  <div class="stat">PAC: ${player.stats.pac}</div>
                  <div class="stat">SHO: ${player.stats.sho}</div>
                  <div class="stat">PAS: ${player.stats.pas}</div>
                  <div class="stat">DRI: ${player.stats.dri}</div>
                  <div class="stat">DEF: ${player.stats.def}</div>
                  <div class="stat">PHY: ${player.stats.phy}</div>
                </div>
              </div>
            </body>
          </html>
        `;
      
        return html;
      }
      
      async gerarCardImagem(player: Player): Promise<Buffer> {
        const html = await this.renderHtml(player);
        const browser = await puppeteer.launch({
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        
        await page.setViewport({
          width: 340,
          height: 500,
          deviceScaleFactor: 2
        });
      
        await page.setContent(html);
        await page.waitForSelector('.card');
      
        const cardElement = await page.$('.card');
        if (!cardElement) {
          throw new Error('Card element not found');
        }
        
        const buffer = await cardElement.screenshot({
          type: 'png',
          omitBackground: true
        }) as Buffer;
        
        await browser.close();
        return buffer;
      }

}
