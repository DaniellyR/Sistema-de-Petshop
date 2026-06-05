const http = require('http');
const conexao = require('./banco');
const rotasPets = require('./rotasPets');

const servidor = http.createServer((req, res) => {
    if ('/login' === req.url){
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Página de Login do Petshop');
    }
    else if ('/' === req.url){
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end("Bem vindo ao seu Petshop");
    }
    else if ('/pets' == req.url){
        rotasPets.listarPets(req, res); 
    }
    else if ('/admins' == req.url){
        conexao.query('select * from administrador', (err, resultados) => {
            if(err){
                console.log('Erro ao acessar tabela');
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify(resultados));
                console.log(resultados);
            }
        });
    }  
    else{
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end ("Erro 404");
    }
});

servidor.listen(3000);