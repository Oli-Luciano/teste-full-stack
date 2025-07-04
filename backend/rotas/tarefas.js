const express = require('express');
const router = express.Router();
const Tarefa = require('../modelos/Tarefa');

// 📄 Listar todas as tarefas
router.get('/', (req, res) => {
  Tarefa.listarTarefas((erro, resultados) => {
    if (erro) {
      return res.status(500).json({ erro: 'Erro ao buscar tarefas' });
    }
    res.json(resultados);
  });
});

// ➕ Criar uma nova tarefa
router.post('/', (req, res) => {
  const { titulo } = req.body;
  if (!titulo) {
    return res.status(400).json({ erro: 'Título é obrigatório' });
  }

  Tarefa.criarTarefa(titulo, (erro, resultado) => {
    if (erro) {
      return res.status(500).json({ erro: 'Erro ao criar tarefa' });
    }
    res.status(201).json({ id: resultado.insertId, titulo, concluida: false });
  });
});

// ✏️ Atualizar o título de uma tarefa
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { titulo } = req.body;

  if (!titulo) {
    return res.status(400).json({ erro: 'Título é obrigatório' });
  }

  Tarefa.atualizarTarefa(id, titulo, (erro) => {
    if (erro) {
      return res.status(500).json({ erro: 'Erro ao atualizar tarefa' });
    }
    res.json({ id, titulo });
  });
});

// ✅ Marcar tarefa como concluída
router.patch('/:id/concluir', (req, res) => {
  const { id } = req.params;

  Tarefa.marcarConcluida(id, (erro) => {
    if (erro) {
      return res.status(500).json({ erro: 'Erro ao marcar como concluída' });
    }
    res.json({ id, concluida: true });
  });
});

// 🗑️ Deletar uma tarefa
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Tarefa.deletarTarefa(id, (erro) => {
    if (erro) {
      return res.status(500).json({ erro: 'Erro ao excluir tarefa' });
    }
    res.json({ mensagem: 'Tarefa excluída com sucesso' });
  });
});

module.exports = router;
