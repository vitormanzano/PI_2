import HTTP from "http";

const server = HTTP.createServer((req,res) =>{});

server.listen(3000,()=>{
    console.log("Servidor rodando na porta 3000. ");
});