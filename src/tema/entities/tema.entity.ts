import { IsNotEmpty } from "class-validator";
import { Postagem } from "src/postagem/entities/postagem.entity";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'tb_temas'})
export class Tema{

    @PrimaryGeneratedColumn()
    public id: number;

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    public descricao: string;

    @OneToMany(() => Postagem, (postagem) => postagem.tema)
    postagem: Postagem[];
}