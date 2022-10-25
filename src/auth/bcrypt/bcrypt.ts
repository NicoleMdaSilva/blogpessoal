import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt' //importação da lib, pegando tudo que ela tem (*) e chamando ela de bcrypt (as bcrypt)


/**
 * Bycript é um @service que deve ser posto também no modulo (nesse caso usuarioModule)
 */
@Injectable()
export class Bcrypt{
    
    async criptografarSenha(senha: string): Promise<string>{

        let saltos = 10; //Saltos são a quantidades de criptografias que vai passar na mensagem

        return await bcrypt.hash(senha, saltos);
        /**
        * @desc Isso cria a criptografia da informação (senha) e você tem
        * que por a quantidade de saltos que você quer (usado mais por variaveis para evitar
        * numeros magicos)
        */

    }

    async compararSenha(senhaBanco: string, senhaDigitada: string): Promise<boolean>{
        
        return bcrypt.compareSync(senhaDigitada, senhaBanco) //Comparação de hashes
    }
}