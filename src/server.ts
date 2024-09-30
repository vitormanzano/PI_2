import express, { response } from 'express';
import  {Router,Request,Response} from 'express';
import { request } from 'http';

const app = express();
const route = Router();
const port = 3000;

app.use(express.json());

type Conta = {
    nome:string;
    email: string;
    senha: string;
    data_nascimento: string
}

let contas: Conta[]  =[];

function CadastrarConta(conta:Conta):number {
    contas.push(conta);
    return contas.length;
}

function VerificarConta(email:string, senha:string): boolean {
    let tamanho = contas.length;
    let verificador:boolean = false;

    for (let i=0;i<tamanho;i++){
        if(email == contas[i].email && senha == contas[i].senha

        ) verificador = true

    }
    return verificador;
    
}



route.put('/SignUp',
    (req:Request, res: Response) => {

        const GetName= req.get('name');
        const GetEmail = req.get('email');
        const GetSenha = req.get('senha');
        const GetData = req.get('data_nascimento');

        if (GetName && GetEmail && GetSenha && GetData){
            const NovaConta: Conta = {
                nome: GetName,
                email: GetEmail,
                senha: GetSenha,
                data_nascimento: GetData
            };
            const CodConta = CadastrarConta(NovaConta);
            res.send(`Nova conta adicionada ${CodConta}`);
        }
        else{
            console.log('Faltam paramêtros na requisição')
        }
    }

)

route.put('\SignIn',
    (req: Request, res: Response) => {

        const GetEmail = req.get('email');
        const GetSenha = req.get('senha');

        if (GetEmail && GetSenha){

            
            let TemConta = VerificarConta(GetEmail,GetSenha);
            if (TemConta) {
                console.log("Conta Encontrada!");
            }
            else {
                console.log("Conta não encontrada!")
            }

        }
    }

)
















app.use(route)
app.listen(port, () => console.log(`Server rodando na porta ${port}`));
