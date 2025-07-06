import conexao from '../banco.js';

// ✅ Listar apenas tarefas do usuário logado
export const listarTarefas = (req, res) => {
  const usuarioId = req.usuarioId;
  conexao.query('SELECT * FROM tarefas WHERE usuario_id = ?', [usuarioId], (err, resultados) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao listar tarefas' });
    }
    res.json(resultados);
  });
};

// ✅ Adicionar tarefa vinculada ao usuário
export const adicionarTarefa = (req, res) => {
  const { descricao } = req.body;
  const usuarioId = req.usuarioId;
  conexao.query(
    'INSERT INTO tarefas (titulo, concluida, usuario_id) VALUES (?, ?, ?)',
    [descricao, false, usuarioId],
    (err, resultado) => {
      if (err) return res.status(500).json({ erro: 'Erro ao adicionar tarefa' });
      res.status(201).json({ id: resultado.insertId, titulo: descricao, concluida: false });
    }
  );
};

// ✅ Atualizar tarefa se for do usuário
export const atualizarTarefa = (req, res) => {
  const { id } = req.params;
  const { titulo, concluida } = req.body;
  const usuarioId = req.usuarioId;
  conexao.query(
    'UPDATE tarefas SET titulo = ?, concluida = ? WHERE id = ? AND usuario_id = ?',
    [titulo, concluida, id, usuarioId],
    (err) => {
      if (err) return res.status(500).json({ erro: 'Erro ao atualizar tarefa' });
      res.json({ id, titulo, concluida });
    }
  );
};

// ✅ Excluir tarefa se for do usuário
export const excluirTarefa = (req, res) => {
  const { id } = req.params;
  const usuarioId = req.usuarioId;
  conexao.query('DELETE FROM tarefas WHERE id = ? AND usuario_id = ?', [id, usuarioId], (err) => {
    if (err) return res.status(500).json({ erro: 'Erro ao excluir tarefa' });
    res.status(204).end();
  });
};

// ✅ Marcar tarefa como concluída se for do usuário
export const concluirTarefa = (req, res) => {
  const { id } = req.params;
  const usuarioId = req.usuarioId;
  conexao.query(
    'UPDATE tarefas SET concluida = true WHERE id = ? AND usuario_id = ?',
    [id, usuarioId],
    (err) => {
      if (err) return res.status(500).json({ erro: 'Erro ao concluir tarefa' });
      res.json({ id, concluida: true });
    }
  );
};
  