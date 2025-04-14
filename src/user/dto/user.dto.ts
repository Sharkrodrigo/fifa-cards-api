import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ description: 'O e-mail do usuário', example: 'usuario@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'A senha do usuário', example: 'senha123' })
    @IsString()
    @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
    senha: string;
}

export class UpdateUserDto {
    @ApiPropertyOptional({ description: 'O novo e-mail do usuário', example: 'usuario@novoemail.com' })
    @IsOptional()
    @IsEmail()
    email?: string;
  
    @ApiPropertyOptional({ description: 'A nova senha do usuário', example: 'novasenha123' })
    @IsOptional()
    @IsString()
    @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
    senha?: string;
}

export class LoginUserDto {
    @ApiProperty({ description: 'O e-mail do usuário', example: 'usuario@example.com' })
    @IsEmail()
    email: string;
  
    @ApiProperty({ description: 'A senha do usuário', example: 'senha123' })
    @IsString()
    @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
    senha: string;
}
