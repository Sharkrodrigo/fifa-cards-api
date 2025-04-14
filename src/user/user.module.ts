import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user';
import { Player } from 'src/player/player';

@Module({
  imports: [TypeOrmModule.forFeature([User, Player])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}