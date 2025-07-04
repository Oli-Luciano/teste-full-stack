const mysql = require('mysql2');

const conexao = mysql.createConnection({
  host: 'localhost',
  user: 'root',           // <-- Substitua pelo seu usuário do MySQL
  password: '',           // <-- Substitua pela sua senha (se tiver)
  database: 'tarefas_db'  // <-- Nome do seu banco de dados
});

conexao.connect((erro) => {
  if (erro) {
    console.error('Erro ao conectar ao banco de dados:', erro);
    return;
  }
  console.log('✅ Conectado ao banco de dados MySQL!');
});

module.exports = conexao;
