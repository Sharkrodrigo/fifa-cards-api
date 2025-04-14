import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { User } from './user';


@ApiTags('users') // Tag para agrupar os endpoints de usuários no Swagger
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Cria um novo usuário
   * @param createUserDto DTO para criar o usuário
   * @returns O usuário criado
   */
  @Post()
  @ApiOperation({ summary: 'Criar um novo usuário' }) // Descrição da operação
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso', type: User })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  /**
   * Busca todos os usuários
   * @returns Lista de todos os usuários
   */
  @Get()
  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiResponse({ status: 200, description: 'Lista de usuários', type: [User] })
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  /**
   * Busca um usuário pelo id
   * @param id ID do usuário
   * @returns O usuário encontrado
   */
  @Get(':id')
  @ApiOperation({ summary: 'Buscar usuário por ID' })
  @ApiParam({ name: 'id', description: 'ID do usuário', type: 'number' }) // Adicionando a descrição do parâmetro
  @ApiResponse({ status: 200, description: 'Usuário encontrado', type: User })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  /**
   * Atualiza um usuário pelo ID
   * @param id ID do usuário
   * @param updateUserDto DTO para atualizar o usuário
   * @returns O usuário atualizado
   */
  @Put(':id')
  @ApiOperation({ summary: 'Atualizar usuário' })
  @ApiParam({ name: 'id', description: 'ID do usuário', type: 'number' })
  @ApiResponse({ status: 200, description: 'Usuário atualizado', type: User })
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  /**
   * Remove um usuário pelo ID
   * @param id ID do usuário
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Remover usuário' })
  @ApiParam({ name: 'id', description: 'ID do usuário', type: 'number' })
  @ApiResponse({ status: 204, description: 'Usuário removido com sucesso' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
