import { Request, RequestHandler, Response } from 'express';
import OracleDB from 'oracledb';

export namespace AccountsHandler {

    export type UserAccount = {     //Type/TABELA
        id: number | undefined;
        nomeCompleto: string;
        email: string;
        senha: string | undefined;
        dataNascimento: string;
    };


    async function CadastrarConta(email: string   //Funcao Cadastrar
        , senha: string
        , nomeCompleto: string
        , dataNascimento:string)
         {      //Funcao async return promise
            console.log("Ola");

            let connection  = await OracleDB.getConnection({      //Conexao com BD
                user: "ADMIN",
                password: "123",
                
                connectString: "(description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1522)(host=adb.sa-saopaulo-1.oraclecloud.com))(connect_data=(service_name=g4ab4d74e427060_pi2db_high.adb.oraclecloud.com))(security=(ssl_server_dn_match=yes)))"
                
            });

            let create = await connection.execute(
                "INSERT INTO CLIENTE VALUES (1,':email', ':senha', ':nomeCompleto', ':dataNascimento' )",
                {email,senha,nomeCompleto,dataNascimento}  //Insert no BD

            );

            await connection.commit();
        }

        export const CadastroHandler: RequestHandler = 
            async (req: Request, res: Response) => {  
                const pEmail = req.get('email');
                const pSenha = req.get('senha');
                const pNomeCompleto = req.get('nomeCompleto');
                const pDataNascimento = req.get('dataNascimento');   //Pegando as reqs

                if (pEmail && pSenha && pNomeCompleto && pDataNascimento){   
                     //Verificando parâmetros
                    await CadastrarConta(pEmail, pSenha, pNomeCompleto, pDataNascimento);
                    res.statusCode = 200;
                    res.send('Contra criada com sucesso!');

                }
                else {
                    res.statusCode = 400;
                    res.send('Faltam Parâmetros!')
                }
            }

}


