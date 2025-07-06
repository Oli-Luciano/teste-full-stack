import bcrypt from 'bcrypt';
import conexao from '../banco.js';

const email = 'teste@teste.com';
const senha = '123456';

bcrypt.hash(senha, 10, (err, hash) => {
  if (err) {
    console.error('Erro ao gerar hash:', err);
    return;
  }

  const sql = 'INSERT INTO usuarios (email, senha) VALUES (?, ?)';
  conexao.query(sql, [email, hash], (erro, resultado) => {
    if (erro) {
      console.error('Erro ao inserir usuário:', erro);
    } else {
      console.log('Usuário inserido com sucesso!');
    }
    process.exit(); 
  });
});
