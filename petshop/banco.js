const mysql2 = require('mysql2');

const conexao = mysql2.createConnection({
    host: 'localhost',
    database: 'petshop',
    user: 'root',
    password: 'root'
});

conexao.connect((err) => {
    if (err){
        console.log('Erro ao conectar');
    } else {
        console.log('Conectado ao banco com sucesso!');
    }
});

module.exports = conexao;