// backend/modelos/Tarefa.js
const conexao = require('../banco');

// Obter todas as tarefas
function listarTarefas(callback) {
  conexao.query('SELECT * FROM tarefas ORDER BY id DESC', callback);
}

// Criar nova tarefa
function criarTarefa(titulo, callback) {
  conexao.query('INSERT INTO tarefas (titulo, concluida) VALUES (?, ?)', [titulo, false], callback);
}

// Atualizar tarefa
function atualizarTarefa(id, titulo, callback) {
  conexao.query('UPDATE tarefas SET titulo = ? WHERE id = ?', [titulo, id], callback);
}

// Marcar como concluída
function marcarConcluida(id, callback) {
  conexao.query('UPDATE tarefas SET concluida = ? WHERE id = ?', [true, id], callback);
}

// Deletar tarefa
function deletarTarefa(id, callback) {
  conexao.query('DELETE FROM tarefas WHERE id = ?', [id], callback);
}

module.exports = {
  listarTarefas,
  criarTarefa,
  atualizarTarefa,
  marcarConcluida,
  deletarTarefa
};
