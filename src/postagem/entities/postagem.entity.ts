//Criação de classe para o banco de dados
import { IsNotEmpty } from "class-validator";
import { Tema } from "src/tema/entities/tema.entity";
import { Usuario } from "src/usuario/entities/usuario.entities";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'tb_postagens'})
export class Postagem{
    @PrimaryGeneratedColumn() //vai dizer q o id é uma coluna e que é uma chave primeira
    public id: number;

    @IsNotEmpty() //O class validator verifica que se isso não está vazio, para que não precise enviar pro banco
    @Column({length:100 , nullable: false}) //decorator de coluna
    public titulo: string;

    @IsNotEmpty()
    @Column({length:1000 , nullable: false})
    public texto: string;

    @UpdateDateColumn()
    public data: Date; //Ele que atualiza o banco de dados, mais ou menos um changelog

    @ManyToOne(() => Tema, (tema) => tema.postagem, {
        onDelete: 'CASCADE' //Quando for apagar um tema apaga tudo
    })
    tema: Tema;

    @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
        onDelete: 'CASCADE'
    })
    usuario: Usuario;
}