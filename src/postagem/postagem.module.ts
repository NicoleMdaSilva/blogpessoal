import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { Postagem } from "./entities/postagem.entity";
import { PostagemService } from "./services/postagem.service";
import { PostagemControler } from "./controllers/postagem.controller";
import { TemaModule } from "src/tema/tema.module";
import { TemaService } from "src/tema/services/tema.service";

@Module({
    imports: [TypeOrmModule.forFeature([Postagem]), TemaModule],
    providers: [PostagemService, TemaService],
    controllers: [PostagemControler],
    exports: [TypeOrmModule]
})
export class PostagemModule{}