const http= require('http');
const mysql2= require('mysql2');

const conexao = mysql2.createConnection({
    host: 'localhost',
    database: 'petshop',
    user: 'root',
    password: 'root'
});

conexao.connect((err) => {
    if (err){
        console.log('Erro ao conectar')
    }
    else{
        console.log('Conectado ao banco com sucesso!')
    }
});



const servidor = http.createServer((req, res) => {
    if ('/login' === req.url){
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Página de Login do Petshop');
    }
    else if ('/' === req.url){
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end("Bem vindo ao seu Petshop")
    }
    else if ('/pets' == req.url){
        conexao.query('select * from pets', (err, resultados) => {
            if(err){
                console.log('Erro ao acessar tabela')
            }
            else{
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end('Lista de Pets')
                res.end(JSON.stringify(resultados))
                console.log(resultados)
            }
        });
    } 
    else{
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end ("Erro 404")
    }
});

servidor.listen(3000);














