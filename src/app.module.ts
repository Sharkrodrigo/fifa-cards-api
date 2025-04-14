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
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',
      database: 'mercefut',
      entities: [Player, User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Player, User]),
    UserModule,
  ],
  controllers: [PlayerController],
  providers: [PlayerService],
})
export class AppModule {}
