import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsuarioService } from "../../usuario/services/usuario.service";
import { Bcrypt } from "../bcrypt/bcrypt";

@Injectable()
export class AuthService{
    constructor(
        private usuarioService: UsuarioService,
        private jwtService: JwtService,
        private bcrypt: Bcrypt
    ) {}

    async validateUser(username: string, password: string): Promise<any>{
        const buscaUsuario = await this.usuarioService.findByUsuario(username); //Ele valida o usuario

        if(!buscaUsuario)
            throw new HttpException('Usuario não encontrado', HttpStatus.NOT_FOUND)
       
        const match = await this.bcrypt.compararSenha(buscaUsuario.senha, password)

        if(buscaUsuario && match){
            const { senha, ...result } = buscaUsuario //SpreadOperator - Ta pegando tudo do objeto e pondo dentro do result e a senha na variavel senha
            return result;
        }

        return null;
    }

    async login(usuarioLogin: any){
        const payload = {
            username: usuarioLogin.usuario,
            sub: 'blogpessoal' //ele diz que pra onde o token se refere
        }

        return{
            usuario: usuarioLogin.usuario,
            token: `Bearer ${this.jwtService.sign(payload)} ` //Tem varios tipos de token, o bearer fala que estamos trabalhando dentro do app
        }
    }
}