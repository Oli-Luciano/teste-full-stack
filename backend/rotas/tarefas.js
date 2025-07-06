import express from 'express';
import autenticarToken from '../middlewares/auth.js';
import Tarefa from '../modelos/Tarefa.js';

const router = express.Router();

// Aplica o middleware de autenticação JWT para todas as rotas abaixo
router.use(autenticarToken);

// Rota GET para listar todas as tarefas do usuário autenticado
router.get('/', (req, res) => {
  const usuarioId = req.usuarioId;
  Tarefa.listarTarefasPorUsuario(usuarioId, (erro, resultados) => {
    if (erro) return res.status(500).json({ erro: 'Erro ao buscar tarefas' });
    res.json(resultados);
  });
});

// Rota POST para criar uma nova tarefa vinculada ao usuário autenticado
router.post('/', (req, res) => {
  const { titulo } = req.body;
  const usuarioId = req.usuarioId;

  // Verifica se o título foi fornecido
  if (!titulo) return res.status(400).json({ erro: 'Título é obrigatório' });

  Tarefa.criarTarefaParaUsuario(titulo, usuarioId, (erro, resultado) => {
    if (erro) return res.status(500).json({ erro: 'Erro ao criar tarefa' });

    // Retorna a tarefa recém-criada com o ID gerado pelo banco
    res.status(201).json({ id: resultado.insertId, titulo, concluida: false });
  });
});

// Rota PUT para atualizar o título de uma tarefa pertencente ao usuário autenticado
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { titulo } = req.body;
  const usuarioId = req.usuarioId;

  if (!titulo) return res.status(400).json({ erro: 'Título é obrigatório' });

  Tarefa.atualizarTarefa(id, usuarioId, titulo, (erro) => {
    if (erro) return res.status(500).json({ erro: 'Erro ao atualizar tarefa' });
    res.json({ id, titulo });
  });
});

// Rota PATCH para marcar uma tarefa como concluída
router.patch('/:id/concluir', (req, res) => {
  const { id } = req.params;
  const usuarioId = req.usuarioId;

  Tarefa.marcarConcluida(id, usuarioId, (erro) => {
    if (erro) return res.status(500).json({ erro: 'Erro ao marcar como concluída' });
    res.json({ id, concluida: true });
  });
});

// Rota DELETE para excluir uma tarefa do usuário autenticado
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const usuarioId = req.usuarioId;

  Tarefa.deletarTarefa(id, usuarioId, (erro) => {
    if (erro) return res.status(500).json({ erro: 'Erro ao excluir tarefa' });
    res.json({ mensagem: 'Tarefa excluída com sucesso' });
  });
});

// Exporta o router para ser usado no app principal
export default router;

