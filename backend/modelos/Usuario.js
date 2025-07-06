import conexao from '../banco.js';

// Objeto Usuario contendo métodos para interação com a tabela de usuários no banco de dados
const Usuario = {
  // Busca um usuário no banco pelo e-mail (usado para login e verificação de duplicidade)
  buscarPorEmail: (email, callback) => {
    const sql = 'SELECT * FROM usuarios WHERE email = ?';
    conexao.query(sql, [email], callback);
  },

  // Insere um novo usuário no banco com e-mail e senha já criptografada
  inserir: (email, senhaHash, callback) => {
    const sql = 'INSERT INTO usuarios (email, senha) VALUES (?, ?)';
    conexao.query(sql, [email, senhaHash], callback);
  }
};

// Exporta o objeto Usuario para uso em outras partes da aplicação (ex: autenticação)
export default Usuario;

