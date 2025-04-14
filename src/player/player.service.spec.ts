import { Test, TestingModule } from '@nestjs/testing';
import { PlayerService } from './player.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Player } from './player';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

const mockPlayer: Player = {
  id: 1,
  nome: 'Cristiano Ronaldo',
  posicao: 'ATA',
  fotourl: 'https://link-da-imagem.com',
  overall: 94,
  stats: {
    pac: 90,
    sho: 95,
    pas: 82,
    dri: 91,
    def: 35,
    phy: 80,
  },
};

describe('PlayerService', () => {
  let service: PlayerService;
  let repo: Repository<Player>;

  const mockRepo = {
    find: jest.fn().mockResolvedValue([mockPlayer]),
    findOneBy: jest.fn().mockResolvedValue(mockPlayer),
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockResolvedValue(mockPlayer),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayerService,
        {
          provide: getRepositoryToken(Player),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<PlayerService>(PlayerService);
    repo = module.get<Repository<Player>>(getRepositoryToken(Player));
  });

  it('deve retornar todos os jogadores', async () => {
    const result = await service.findAll();
    expect(result).toEqual([mockPlayer]);
    expect(repo.find).toHaveBeenCalled();
  });

  it('deve retornar um jogador por ID', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual(mockPlayer);
    expect(repo.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });

  it('deve lançar NotFoundException se o jogador não for encontrado', async () => {
    jest.spyOn(repo, 'findOneBy').mockResolvedValueOnce(null);
    await expect(service.findOne(2)).rejects.toThrow(NotFoundException);
  });

  it('deve criar um jogador', async () => {
    const dto = { ...mockPlayer };
    const result = await service.create(dto);
    expect(result).toEqual(mockPlayer);
    expect(repo.create).toHaveBeenCalledWith(dto);
    expect(repo.save).toHaveBeenCalled();
  });

  it('deve atualizar um jogador existente', async () => {
    const updated = await service.update(1, { nome: 'CR7' } as any);
    expect(updated.nome).toEqual('CR7');
    expect(repo.update).toHaveBeenCalledWith(1, { nome: 'CR7' });
  });

  it('deve excluir um jogador', async () => {
    const result = await service.delete(1);
    expect(repo.delete).toHaveBeenCalledWith(1);
  });

  it('deve gerar HTML corretamente', async () => {
    const html = await service.renderHtml(mockPlayer);
    expect(typeof html).toBe('string');
    expect(html).toContain(mockPlayer.nome);
    expect(html).toContain(mockPlayer.stats.pac.toString());
  });

  // it('deve gerar imagem do card (mock)', async () => {
  //   jest.spyOn(service, 'renderHtml').mockResolvedValue('<div class="card"></div>');

  //   const mockBuffer = Buffer.from('image');
  //   const browser = {
  //     newPage: jest.fn().mockResolvedValue({
  //       setViewport: jest.fn(),
  //       setContent: jest.fn(),
  //       waitForSelector: jest.fn(),
  //       $: jest.fn().mockResolvedValue({
  //         screenshot: jest.fn().mockResolvedValue(mockBuffer),
  //       }),
  //     }),
  //     close: jest.fn(),
  //   };

  //   jest.mock('puppeteer', () => ({
  //     launch: jest.fn().mockResolvedValue(browser),
  //   }));

  //   const buffer = await service.gerarCardImagem(mockPlayer);
  //   expect(buffer).toBeInstanceOf(Buffer);
  // });
});
