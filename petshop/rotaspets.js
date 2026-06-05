const conexao = require('./banco');


// CRUD

function listarPets(req, res) { // função para ler dentro do BD a tela pets; ler (R)
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

function cadastrarPet(req, res) {   //receber novos pets no BD  crearte C
    let corpo = ''; //as info

    req.on('data', (pedaco) => {
        corpo += pedaco; 
    });

    req.on('end', () => { //conexão com o banco
        const novoPet = JSON.parse(corpo); 
        const sql = 'INSERT INTO pets (nome, especie, idade, sexo, ID_tutor) VALUES (?, ?, ?, ?, ?)';
        const valores = [novoPet.nome, novoPet.especie, novoPet.idade, novoPet.sexo, novoPet.ID_tutor];

        conexao.query(sql, valores, (err, resultados) => {
            if(err){
                console.log('Erro ao cadastrar pet no banco', err);
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('Erro interno ao cadastrar');
            } else {
                res.writeHead(201, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('Pet salvo no banco de dados com sucesso!');
            }
        });
    });
}

function deletePets(req, res){ //deletar D
    let corpo = '';

    req.on('data', (pedaco) => {
        corpo += pedaco;
    });

    req.on('end', () => {
        const dados = JSON.parse(corpo); 
        const sql = 'DELETE FROM pets WHERE ID_pets = ?';
        const valores = [dados.ID_pets];

        conexao.query(sql, valores, (err, resultados) => {
            if(err){
                console.log('Erro ao deletar pet', err);
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('Erro interno ao tentar apagar o pet');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('Pet deletado do sistema com sucesso!');
            }
        });
    });
    
}

function atualizarPet(req, res){ // U de update
    let corpo = '';

    req.on('data', (pedaco) => {
        corpo += pedaco;
    });
    req.on('end', () => {
        const atualizacao = JSON.parse(corpo);    
        const sql = 'UPDATE pets SET nome = ?, especie = ?, idade = ?, sexo = ?, ID_tutor = ? WHERE ID_pets = ?';;
        const valores = [atualizacao.nome, atualizacao.especie, atualizacao.idade, atualizacao.sexo, atualizacao.ID_tutor, atualizacao.ID_pets];

    conexao.query(sql, valores, (err, resultados) => {
        if(err){
            console.log('Erro ao atualizar pet', err);
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Erro interno ao tentar atualizar o pet');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Pet atualizado no sistema com sucesso!');
        }
    });
});
}

module.exports = { listarPets, cadastrarPet, deletePets, atualizarPet };