import { Test, TestingModule } from '@nestjs/testing';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { CreatePlayerDto } from './dto/player.dto';
import { NotFoundException } from '@nestjs/common';
import { Player } from './player';

describe('PlayerController', () => {
  let controller: PlayerController;
  let service: PlayerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayerController],
      providers: [
        {
          provide: PlayerService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            renderHtml: jest.fn(),
            gerarCardImagem: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PlayerController>(PlayerController);
    service = module.get<PlayerService>(PlayerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of players', async () => {
      const result: Player[] = [
        { id: 1, nome: 'Player 1', fotourl: '', posicao: '', overall: 90, stats: { pac: 90, sho: 80, pas: 75, dri: 85, def: 60, phy: 80 } },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a player if found', async () => {
      const player: Player = { id: 1, nome: 'Player 1', fotourl: '', posicao: '', overall: 90, stats: { pac: 90, sho: 80, pas: 75, dri: 85, def: 60, phy: 80 } };
      jest.spyOn(service, 'findOne').mockResolvedValue(player);

      expect(await controller.findOne('1')).toBe(player);
    });

    // it('should throw a NotFoundException if player not found', async () => {
    //   jest.spyOn(service, 'findOne').mockResolvedValueOnce(null as unknown as Player);
    //   await expect(controller.findOne('1')).rejects.toThrowError(NotFoundException);
    // });

  });

  describe('create', () => {
    it('should create a player and return it', async () => {
      const createPlayerDto: CreatePlayerDto = { nome: 'Player 1', fotourl: '', posicao: '', overall: 90, stats: { pac: 90, sho: 80, pas: 75, dri: 85, def: 60, phy: 80 } };
      const createdPlayer: Player = { id: 1, ...createPlayerDto };
      jest.spyOn(service, 'create').mockResolvedValue(createdPlayer);

      expect(await controller.create(createPlayerDto)).toBe(createdPlayer);
    });
  });

  describe('getCardHtml', () => {
    it('should return HTML for a player', async () => {
      const player: Player = { id: 1, nome: 'Player 1', fotourl: '', posicao: '', overall: 90, stats: { pac: 90, sho: 80, pas: 75, dri: 85, def: 60, phy: 80 } };
      const html = '<html>...</html>';
      jest.spyOn(service, 'findOne').mockResolvedValue(player);
      jest.spyOn(service, 'renderHtml').mockResolvedValue(html);

      const response = { setHeader: jest.fn(), send: jest.fn() } as any;

      await controller.getCardHtml('1', response);

      expect(response.setHeader).toHaveBeenCalledWith('Content-Type', 'text/html');
      expect(response.send).toHaveBeenCalledWith(html);
    });
  });

  describe('getCardImage', () => {
    it('should return the image of a player', async () => {
      const player: Player = { id: 1, nome: 'Player 1', fotourl: '', posicao: '', overall: 90, stats: { pac: 90, sho: 80, pas: 75, dri: 85, def: 60, phy: 80 } };
      const imageBuffer = Buffer.from('image');
      jest.spyOn(service, 'findOne').mockResolvedValue(player);
      jest.spyOn(service, 'gerarCardImagem').mockResolvedValue(imageBuffer);

      const response = { setHeader: jest.fn(), send: jest.fn() } as any;

      await controller.getCardImage('1', response);

      expect(response.setHeader).toHaveBeenCalledWith('Content-Type', 'image/png');
      expect(response.send).toHaveBeenCalledWith(imageBuffer);
    });
  });
});
