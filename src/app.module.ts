import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerController } from './player/player.controller';
import { PlayerService } from './player/player.service';
import { Player } from './player/player';

  @Module({
    imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        url: 'postgresql://postgres:bnOwwNmErqbeBDdQlVAdkJkVAtFvKfUL@ballast.proxy.rlwy.net:49322/railway',
        autoLoadEntities: true,
        entities: [Player],
        synchronize: true,
      }),
      TypeOrmModule.forFeature([Player]),
    ],
    controllers: [PlayerController],
    providers: [PlayerService],
  })
export class AppModule {}