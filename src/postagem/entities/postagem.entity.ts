//Criação de classe para o banco de dados
import { IsNotEmpty } from "class-validator";
import { Tema } from "src/tema/entities/tema.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'tb_postagens'})
export class Postagem{
    @PrimaryGeneratedColumn() //vai dizer q o id é uma coluna e que é uma chave primeira
    id: number;

    @IsNotEmpty() //O class validator verifica que se isso não está vazio, para que não precise enviar pro banco
    @Column({length:100 , nullable: false}) //decorator de coluna
    titulo: string;

    @IsNotEmpty()
    @Column({length:1000 , nullable: false})
    texto: string;

    @UpdateDateColumn()
    data: Date; //Ele que atualiza o banco de dados, mais ou menos um changelog

    @ManyToOne(() => Tema, (tema) => tema.postagem, {
        onDelete: 'CASCADE' //Quando for apagar um tema apaga tudo
    })
    tema: Tema;
}