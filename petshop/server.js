const fs = require('fs');
const http = require('http');
const conexao = require('./banco');
const rotasPets = require('./rotasPets');

const servidor = http.createServer((req, res) => {
    if ('/login' === req.url){
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Página de Login do Petshop');
    }
    else if ('/' === req.url && 'GET' === req.method) {
        fs.readFile('./site/index.html', (err, pagina) => {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(pagina);
        });
    }
    else if ('/agendamento' === req.url && 'GET' === req.method) {
        fs.readFile('./site/agendamento.html', (err, pagina) => {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(pagina);
        });
    }

    else if ('/confirmacao' === req.url && 'GET' === req.method) {
        fs.readFile('./site/confirmacao.html', (err, pagina) => {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(pagina);
        });
    }
    else if ('/style.css' === req.url && 'GET' === req.method) {
        fs.readFile('./site/style.css', (err, pagina) => {
            res.writeHead(200, { 'Content-Type': 'text/css; charset=utf-8' });
            res.end(pagina);
        });
    }

    //imagens
    else if ('/icone-pata.png' === req.url && 'GET' === req.method) {
        fs.readFile('./site/icone-pata.png', (err, pagina) => {
            res.writeHead(200, { 'Content-Type': 'image/png; charset=utf-8' });
            res.end(pagina);
        });
    }
    else if ('/icone-geral.png' === req.url && 'GET' === req.method) {
        fs.readFile('./site/icone-geral.png', (err, pagina) => {
            res.writeHead(200, { 'Content-Type': 'image/png; charset=utf-8' });
            res.end(pagina);
        });
    }
    else if ('/icone-tesoura.png' === req.url && 'GET' === req.method) {
        fs.readFile('./site/icone-tesoura.png', (err, pagina) => {
            res.writeHead(200, { 'Content-Type': 'image/png; charset=utf-8' });
            res.end(pagina);
        });
    }
    else if ('/icone-animais.webp' === req.url && 'GET' === req.method) {
        fs.readFile('./site/icone-animais.webp', (err, pagina) => {
            res.writeHead(200, { 'Content-Type': 'image/webp; charset=utf-8' });
            res.end(pagina);
        });
    }
    else if ('/icone-banheira.webp' === req.url && 'GET' === req.method) {
        fs.readFile('./site/icone-banheira.webp', (err, pagina) => {
            res.writeHead(200, { 'Content-Type': 'image/webp; charset=utf-8' });
            res.end(pagina);
        });
    }

    //tabela pets
    else if ('/pets' === req.url && 'GET' === req.method) {
        rotasPets.listarPets(req, res);
    }
    else if ('/pets' === req.url && 'POST' === req.method) {
        rotasPets.cadastrarPet(req, res);
    }
    else if ('/pets' === req.url && 'DELETE' == req.method){
        rotasPets.deletarPet(req, res);
    }
    else if ('/pets' === req.url && 'PUT' === req.method){
        rotasPets.atualizarPet(req, res);
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