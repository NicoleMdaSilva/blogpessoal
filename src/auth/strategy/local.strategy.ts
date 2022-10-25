import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../services/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){ //Ele valida os arquivos para criar os tokens
    constructor (private authService: AuthService){ 
        super({ //Forma que temos de chamar o construtor da super classe
        //Estamos configurando como vai usar a estrategy
            usernameField: 'usuario', //Está falando qual campo vai usar 
            passwordField: 'senha'
        });
    }

    async validate(username: string, password: string): Promise<any>{ //Evitar usar o any ao maximo, usam quanto tem uma typagem muito complexa (você não sabe o que ele retorna)
        const user = await this.authService.validateUser(username, password); //ELe valida o login

        if(!user){
            throw new UnauthorizedException(); //Erro de acesso não autorizado
        }
        return user;
    }
}