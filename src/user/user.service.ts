import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, senha } = createUserDto;

    const hashedPassword = await bcrypt.hash(senha, 10);

    const user = this.userRepository.create({
      email,
      senha: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuário com id ${id} não encontrado`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (updateUserDto.senha) {
      updateUserDto.senha = await bcrypt.hash(updateUserDto.senha, 10);
    }

    await this.userRepository.update(id, updateUserDto);
    return { ...user, ...updateUserDto };
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.delete(user.id);
  }
}
