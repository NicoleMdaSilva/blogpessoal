import { Injectable } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common/enums";
import { HttpException } from "@nestjs/common/exceptions";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Like, Repository } from "typeorm";
import { Postagem } from "../entities/postagem.entity";

//Service faz pegar as informações do banco
@Injectable() //É o jeito que acessamos a tabela
export class PostagemService{
  temaService: any;
    constructor ( 
        @InjectRepository(Postagem) //Por o repositorio
        private postagemRepository: Repository<Postagem> //O repositorio precisa da postagem
    ){}

    //Vai criar outro programa para ser rapido
    async findAll(): Promise<Postagem[]>{   //Promise é uma promeça que ele vai retornar
      return await this.postagemRepository.find({
        relations: {
          tema: true
        }
      });
    } 
    
    async findById(id: number): Promise<Postagem> {

      let postagem = await this.postagemRepository.findOne({
        where: {
          id
        },
        relations: {
          tema: true
        }
      })

      if (!postagem)
        throw new HttpException('Postagem não encontrada', HttpStatus.NOT_FOUND);

        return postagem;
   }

   async findByTitulo(titulo: string): Promise<Postagem[]>{
    return await this.postagemRepository.find({ //serve para encontrar
      where: {
        titulo: ILike(`%${titulo}%`)
      },
        relations: {
          tema: true
        }
    });
   }

   async create(postagem: Postagem): Promise<Postagem>{
    if(postagem.tema){
      let tema = await this.temaService.findById(postagem.tema)

      if(!tema)
        throw new HttpException('Tema não encontrado', HttpStatus.NOT_FOUND)
    }

      return await this.postagemRepository.save(postagem) //salvar ou melhor, fazer um POST
   }

   async update(postagem: Postagem): Promise<Postagem>{
      let buscaPostagem: Postagem = await this.findById(postagem.id)

      if (!buscaPostagem || !postagem.id)
        throw new HttpException('Postagem não encontrada', HttpStatus.NOT_FOUND);

      if(postagem.tema){
        let tema = await this.temaService.findById(postagem.tema)

        if(!tema)
          throw new HttpException('Tema não encontrado', HttpStatus.NOT_FOUND)
      }
      return await this.postagemRepository.save(postagem); //update
   }

   async delete (id: number): Promise<DeleteResult>{
    let buscaPostagem = await this.findById(id)

    if(!buscaPostagem)
    throw new HttpException('Postagem não encontrada', HttpStatus.NOT_FOUND)

    return await this.postagemRepository.delete(id); //deletar
   }
}
