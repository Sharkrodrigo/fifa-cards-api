import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerController } from './player/player.controller';
import { PlayerService } from './player/player.service';
import { Player } from './player/player';
import { UserModule } from './user/user.module';
import { User } from './user/user';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://postgres:bnOwwNmErqbeBDdQlVAdkJkVAtFvKfUL@ballast.proxy.rlwy.net:49322/railway',
      autoLoadEntities: true,

      entities: [Player, User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Player, User]),
    UserModule,
  ],
  controllers: [PlayerController],
  providers: [PlayerService],
})
export class AppModule { }
