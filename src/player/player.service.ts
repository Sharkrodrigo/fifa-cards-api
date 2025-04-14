// src/player/player.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import * as puppeteer from 'puppeteer';
import { Player } from './player';

@Injectable()
export class PlayerService {
    constructor(
        @InjectRepository(Player)
        private repo: Repository<Player>,
    ) { }

    findAll() {
        return this.repo.find();
    }

    findOne(id: number) {
        return this.repo.findOneBy({ id });
    }

    create(data: Partial<Player>) {
        const player = this.repo.create(data);
        return this.repo.save(player);
    }

    update(id: number, data: Partial<Player>) {
        return this.repo.update(id, data);
    }

    delete(id: number) {
        return this.repo.delete(id);
    }

    async renderHtml(player: Player) {
        const templatePath = path.join(__dirname, 'templates/card.html');
        let html = fs.readFileSync(templatePath, 'utf8');

        html = html
            .replace(/{{nome}}/g, player.nome)
            .replace(/{{fotourl}}/g, player.fotourl)
            .replace(/{{posicao}}/g, player.posicao)
            .replace(/{{overall}}/g, String(player.overall))
            .replace(/{{stats\.pac}}/g, String(player.stats.pac))
            .replace(/{{stats\.sho}}/g, String(player.stats.sho))
            .replace(/{{stats\.pas}}/g, String(player.stats.pas))
            .replace(/{{stats\.dri}}/g, String(player.stats.dri))
            .replace(/{{stats\.def}}/g, String(player.stats.def))
            .replace(/{{stats\.phy}}/g, String(player.stats.phy));

        return html;
    }

    async gerarCardImagem(player: Player): Promise<Buffer> {
        const html = await this.renderHtml(player);
      
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(html);
      
        const buffer = await page.screenshot() as Buffer;
        await browser.close();
      
        return buffer;
      }
      
}
