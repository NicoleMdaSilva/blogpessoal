import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { Usuario } from "../entities/usuario.entities";
import { UsuarioService } from "../services/usuario.service";

@ApiTags('Usuario')
@Controller('/usuarios')
export class UsuarioController{
    constructor (private readonly usuarioService: UsuarioService) {}

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('/all')
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Usuario[]>{
        return this.usuarioService.findAll();
    }

    @Post('/cadastrar')
    @HttpCode(HttpStatus.OK)
    create(
        @Body()
        usuario: Usuario
    ): Promise<Usuario>{
        return this.usuarioService.create(usuario);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/atualizar')
    @ApiBearerAuth()
    @HttpCode(HttpStatus.OK)
    update(
        @Body()
        usuario: Usuario
    ): Promise<Usuario>{
        return this.usuarioService.update(usuario);
    }
}