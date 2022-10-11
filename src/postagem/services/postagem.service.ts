import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Postagem } from "../entities/postagem.entity";


@Injectable() //É o jeito que acessamos a tabela
export class PostagemService{
    constructor ( 
        @InjectRepository(Postagem) //Por o repositorio
        private postagemRepository: Repository<Postagem> //O repositorio precisa da postagem
    ){}

    //Vai criar outro programa para ser rapido
    async findAll(): Promise<Postagem[]>{   //Promise é uma promeça que ele vai retornar
      return await this.postagemRepository.find();
    } 
    
}