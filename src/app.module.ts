import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerController } from './player/player.controller';
import { PlayerService } from './player/player.service';
import { Player } from './player/player';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',
      database: 'mercefut',
      entities: [Player],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Player]),
  ],
  controllers: [PlayerController],
  providers: [PlayerService],
})
export class AppModule {}