import { IsNotEmpty } from "class-validator";
import { Postagem } from "../../postagem/entities/postagem.entity";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";


@Entity({name: 'tb_temas'})
export class Tema{

    @PrimaryGeneratedColumn()
    @ApiProperty()
    public id: number;

    @IsNotEmpty()
    @ApiProperty()
    @Column({length: 255, nullable: false})
    public descricao: string;

    @ApiProperty()
    @OneToMany(() => Postagem, (postagem) => postagem.tema)
    postagem: Postagem[];
}