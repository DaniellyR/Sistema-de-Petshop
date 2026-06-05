const conexao = require('./banco');

function listarPets(req, res) {
    conexao.query('select * from pets', (err, resultados) => {
        if(err){
            console.log('Erro ao acessar tabela');
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify(resultados));
            console.log(resultados);
        }
    });
}

module.exports = { listarPets };