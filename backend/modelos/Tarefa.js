import conexao from '../banco.js';

const Tarefa = {
  listarTarefas: (callback) => {
    conexao.query('SELECT * FROM tarefas', callback);
  },

  criarTarefa: (titulo, callback) => {
    conexao.query('INSERT INTO tarefas (titulo, concluida) VALUES (?, false)', [titulo], callback);
  },

  atualizarTarefa: (id, titulo, callback) => {
    conexao.query('UPDATE tarefas SET titulo = ? WHERE id = ?', [titulo, id], callback);
  },

  marcarConcluida: (id, callback) => {
    conexao.query('UPDATE tarefas SET concluida = true WHERE id = ?', [id], callback);
  },

  deletarTarefa: (id, callback) => {
    conexao.query('DELETE FROM tarefas WHERE id = ?', [id], callback);
  }
};

export default Tarefa;
