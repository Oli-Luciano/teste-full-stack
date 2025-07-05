import mysql from 'mysql2';

const conexao = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tarefas_db'
});

conexao.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('✅ Conectado ao banco de dados MySQL');
  }
});

export default conexao;
