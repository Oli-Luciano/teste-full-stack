import conexao from '../banco.js';

export const listarTarefas = (req, res) => {
  conexao.query('SELECT * FROM tarefas', (err, resultados) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao listar tarefas' });
    }
    res.json(resultados);
  });
};

export const adicionarTarefa = (req, res) => {
  const { descricao } = req.body;
  conexao.query(
    'INSERT INTO tarefas (titulo, concluida) VALUES (?, ?)',
    [descricao, false],
    (err, resultado) => {
      if (err) return res.status(500).json({ erro: 'Erro ao adicionar tarefa' });
      res.status(201).json({ id: resultado.insertId, titulo: descricao, concluida: false });
    }
  );
};

export const atualizarTarefa = (req, res) => {
  const { id } = req.params;
  const { titulo, concluida } = req.body;
  conexao.query(
    'UPDATE tarefas SET titulo = ?, concluida = ? WHERE id = ?',
    [titulo, concluida, id],
    (err) => {
      if (err) return res.status(500).json({ erro: 'Erro ao atualizar tarefa' });
      res.json({ id, titulo, concluida });
    }
  );
};

export const excluirTarefa = (req, res) => {
  const { id } = req.params;
  conexao.query('DELETE FROM tarefas WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ erro: 'Erro ao excluir tarefa' });
    res.status(204).end();
  });
};

export const concluirTarefa = (req, res) => {
  const { id } = req.params;
  conexao.query(
    'UPDATE tarefas SET concluida = true WHERE id = ?',
    [id],
    (err) => {
      if (err) return res.status(500).json({ erro: 'Erro ao concluir tarefa' });
      res.json({ id, concluida: true });
    }
  );
};
