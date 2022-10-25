import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Bcrypt } from "../../auth/bcrypt/bcrypt";
import { Repository } from "typeorm";
import { Usuario } from "../entities/usuario.entities";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UsuarioService{
    /**
     *@desc Usuario não dará para apagar
    */

     constructor (
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private bcrypt: Bcrypt
    ) {}

    /**
     *@desc findByUsuario - função @Get que encontra o usuario pelo nome
     */
     async findByUsuario (usuario: string): Promise<Usuario>{
        return await this.usuarioRepository.findOne({
            where:{
                usuario: usuario
            }
        })
    }

    /**
     * @desc findAll - função @Get que pega todos os usuarios
     */
     async findAll(): Promise<Usuario[]>{
        return await this.usuarioRepository.find({
            relations: {
                postagem: true
            }
        })
    }

    /**
     *@desc findByUsuario - função @Get que encontra o usuario pelo id
     */
    async findById(id: number): Promise<Usuario>{
        let buscaUsuario = await this.usuarioRepository.findOne({
            where: {
                id
            },
            relations: {
                postagem: true
            }
        });

        if(!buscaUsuario)
            throw new HttpException('Usuario não encontrado', HttpStatus.NOT_FOUND)

        return buscaUsuario;
    }

    /**
     *@desc findByUsuario - função @Create que cria um usuario e cryptografa a senha
     */
    async create(usuario: Usuario): Promise<Usuario>{
        let buscaUsuario = await this.findByUsuario(usuario.usuario)

        /**
         * Diferente dos outros CRUDS só vai salvar se NÃO tiver outro usuario por isso está no (if)
         */
        if(!buscaUsuario){
            usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha);
            return await this.usuarioRepository.save(usuario)
        }

        throw new HttpException('O Usuario ja existe', HttpStatus.BAD_REQUEST)
    }

    async update(usuario: Usuario): Promise<Usuario>{
        let updateUsuario: Usuario = await this.findById(usuario.id)
        let buscaUsuario = await this.findByUsuario(usuario.usuario)

        if(!updateUsuario)
            throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);

        if(buscaUsuario && buscaUsuario.id != usuario.id)
            throw new HttpException('Usuario (e-mail) já está cadastrado', HttpStatus.BAD_REQUEST);

        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)
        return await this.usuarioRepository.save(usuario);
    }
}