const mysql = require('mysql2');

const conexao = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tarefas_db'  
});

conexao.connect((erro) => {
  if (erro) {
    console.error('Erro ao conectar ao banco de dados:', erro);
    return;
  }
  console.log('✅ Conectado ao banco de dados MySQL!');
});

module.exports = conexao;
