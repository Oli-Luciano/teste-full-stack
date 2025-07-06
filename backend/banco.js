import mysql from 'mysql2';

// Cria a conexão com o banco de dados MySQL usando as credenciais fornecidas
const conexao = mysql.createConnection({
  host: 'localhost',     // Endereço do banco (localhost quando em desenvolvimento local)
  user: 'root',          // Usuário do banco de dados
  password: '',          // Senha do banco (vazia por padrão no XAMPP ou WAMP)
  database: 'tarefas_db' // Nome do banco de dados usado na aplicação
});

// Tenta estabelecer a conexão e exibe mensagem no console
conexao.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err); // Erro na conexão
  } else {
    console.log('✅ Conectado ao banco de dados MySQL'); // Conexão bem-sucedida
  }
});

// Exporta a conexão para ser usada nos modelos da aplicação
export default conexao;

