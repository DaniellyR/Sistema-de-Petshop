const http= require('http');

const servidor = http.createServer((req, res) => {
    if ('/login' === req.url){
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Página de Login do Petshop');
    }
    else if ('/' === req.url){
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end("Bem vindo ao seu Petshop")
    }
    else{
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end ("Erro 404")
    }
});



servidor.listen(3000);














