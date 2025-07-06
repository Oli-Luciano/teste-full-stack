import conexao from '../banco.js';

// Objeto Tarefa contendo métodos para manipular tarefas no banco de dados
const Tarefa = {
  // Lista todas as tarefas associadas a um usuário específico
  listarTarefasPorUsuario: (usuarioId, callback) => {
    const sql = 'SELECT * FROM tarefas WHERE usuario_id = ?';
    conexao.query(sql, [usuarioId], callback);
  },

  // Cria uma nova tarefa associada a um usuário (por padrão, não concluída)
  criarTarefaParaUsuario: (titulo, usuarioId, callback) => {
    const sql = 'INSERT INTO tarefas (titulo, concluida, usuario_id) VALUES (?, false, ?)';
    conexao.query(sql, [titulo, usuarioId], callback);
  },

  // Atualiza o título de uma tarefa específica pertencente ao usuário
  atualizarTarefa: (id, usuarioId, titulo, callback) => {
    const sql = 'UPDATE tarefas SET titulo = ? WHERE id = ? AND usuario_id = ?';
    conexao.query(sql, [titulo, id, usuarioId], callback);
  },

  // Marca uma tarefa como concluída, garantindo que pertence ao usuário
  marcarConcluida: (id, usuarioId, callback) => {
    const sql = 'UPDATE tarefas SET concluida = true WHERE id = ? AND usuario_id = ?';
    conexao.query(sql, [id, usuarioId], callback);
  },

  // Deleta uma tarefa específica do usuário
  deletarTarefa: (id, usuarioId, callback) => {
    const sql = 'DELETE FROM tarefas WHERE id = ? AND usuario_id = ?';
    conexao.query(sql, [id, usuarioId], callback);
  }
};

// Exporta o objeto Tarefa com todos os métodos definidos
export default Tarefa;
