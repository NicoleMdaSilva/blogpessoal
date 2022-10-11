import { Controller, Get } from "@nestjs/common";
import { Body, Delete, HttpCode, Param, Post, Put } from "@nestjs/common/decorators";
import { HttpStatus } from "@nestjs/common/enums";
import { ParseIntPipe } from "@nestjs/common/pipes";
import { Postagem } from "../entities/postagem.entity";
import { PostagemService } from "../services/postagem.service";


@Controller('/Postagens')
export class PostagemControler{
    constructor (private readonly postagemService: PostagemService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Postagem[]>{
        return this.postagemService.findAll(); //O controller pede pro Service puxar as informações do banco
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(
        @Param('id', ParseIntPipe)
        id: number
    ): Promise<Postagem>{
        return this.postagemService.findById(id);
    }

    @Get('/titulo/:titulo')
    @HttpCode(HttpStatus.OK)
    findByTitulo(@Param('titulo')titulo: string): Promise<Postagem[]>{
        return this.postagemService.findByTitulo(titulo);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(
        @Body()
        postagem: Postagem
    ): Promise<Postagem>{
        return this.postagemService.create(postagem); //criar
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(
        @Body()
        postagem: Postagem
    ): Promise<Postagem>{
        return this.postagemService.update(postagem); //atualizar
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(
        @Param('id', ParseIntPipe)
        id: number
    ) {

    }
}