import express, { response } from 'express';
import  {Router,Request,Response} from 'express';
import { request } from 'http';
import { AccountsHandler } from './accounts/accounts';

const server = express();
const routes = Router();
const port = 3000;


routes.get('/', (req: Request, res: Response) => {
    res.statusCode = 403;
    res.send('Acesso não permitido.');
});

routes.post('/SignUp', AccountsHandler.CadastroHandler);  //Rota de Cadastro

server.use(routes);

server.listen(port, () => {
    console.log(`Server rodando na porta ${port}`);
}) 







