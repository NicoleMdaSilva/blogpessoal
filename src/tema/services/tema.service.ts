import { Injectable } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common/enums";
import { HttpException } from "@nestjs/common/exceptions";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Like, Repository } from "typeorm";
import { Tema } from "../entities/Tema.entity";


//Service faz pegar as informações do banco
@Injectable() //É o jeito que acessamos a tabela
export class TemaService{
    constructor ( 
        @InjectRepository(Tema) //Por o repositorio
        private temaRepository: Repository<Tema> //O repositorio precisa da Tema
    ){}

    //Vai criar outro programa para ser rapido
    async findAll(): Promise<Tema[]>{   //Promise é uma promeça que ele vai retornar
      return await this.temaRepository.find({
        relations: {
          postagem: true
        }
      });
    } 
    
    async findById(id: number): Promise<Tema> {

      let tema = await this.temaRepository.findOne({
        where: {
          id
        },
        relations: {
          postagem: true
        }
      })

      if (!Tema)
        throw new HttpException('Tema não encontrada', HttpStatus.NOT_FOUND);

        return tema;
   }

   async findByDescricao(descricao: string): Promise<Tema[]>{
    return await this.temaRepository.find({ //serve para encontrar
      where: {
        descricao: ILike(`%${descricao}%`)
      },
        relations: {
          postagem: true
        }
    });
   }

   async create(tema: Tema): Promise<Tema>{
      return await this.temaRepository.save(tema) //salvar ou melhor, fazer um POST
   }

   async update(tema: Tema): Promise<Tema>{
      let buscaTema: Tema = await this.findById(tema.id)

      if (!buscaTema || !tema.id)
        throw new HttpException('Tema não encontrado', HttpStatus.NOT_FOUND);

        return await this.temaRepository.save(tema); //update

   }

   async delete (id: number): Promise<DeleteResult>{
    let buscaTema = await this.findById(id)

    if(!buscaTema)
    throw new HttpException('Tema não encontrada', HttpStatus.NOT_FOUND)

    return await this.temaRepository.delete(id); //deletar
   }
}
