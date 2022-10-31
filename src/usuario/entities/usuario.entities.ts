import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Postagem } from "../../postagem/entities/postagem.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";


@Entity({name: 'tb_usuarios'})
export class Usuario{
    
    @PrimaryGeneratedColumn()
    @ApiProperty()
    public id: number;

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    @ApiProperty()
    public nome: string;

    @IsEmail() //O sistema vai saber que é um email
    @Column({length: 255, nullable: false})
    @ApiProperty({example: 'email@email.com'})
    public usuario: string;

    @IsNotEmpty()
    @MinLength(8) //Cria um negocio para ser no minimo 8 caracteres
    @Column({length: 255, nullable: false})
    @ApiProperty()
    public senha: string;

    @Column({length: 5000})
    @ApiProperty()
    public foto: string;

    @ApiProperty()
    @OneToMany(() => Postagem, (postagem) => postagem.usuario)
    postagem: Postagem[];
}