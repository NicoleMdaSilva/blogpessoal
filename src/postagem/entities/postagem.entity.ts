//Criação de classe para o banco de dados
import { IsNotEmpty } from "class-validator";
import { Tema } from "../../tema/entities/tema.entity";
import { Usuario } from "../../usuario/entities/usuario.entities";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: 'tb_postagens'})
export class Postagem{
    @ApiProperty()
    @PrimaryGeneratedColumn() //vai dizer q o id é uma coluna e que é uma chave primeira
    public id: number;

    @IsNotEmpty() //O class validator verifica que se isso não está vazio, para que não precise enviar pro banco
    @Column({length:100 , nullable: false}) //decorator de coluna
    @ApiProperty()
    public titulo: string;

    @IsNotEmpty()
    @Column({length:1000 , nullable: false})
    @ApiProperty()
    public texto: string;

    @UpdateDateColumn()
    @ApiProperty()
    public data: Date; //Ele que atualiza o banco de dados, mais ou menos um changelog

    @ApiProperty({type: () => Tema})
    @ManyToOne(() => Tema, (tema) => tema.postagem, {
        onDelete: 'CASCADE' //Quando for apagar um tema apaga tudo
    })
    tema: Tema;

    @ApiProperty({type: () => Usuario})
    @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
        onDelete: 'CASCADE'
    })
    usuario: Usuario;
}