const API_URL = 'http://localhost:3001/tarefas';

export const listarTarefas = async () => {
  const res = await fetch(API_URL);
  return await res.json();
};

export const adicionarTarefa = async (descricao) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ descricao })
  });
  return await res.json();
};

export const atualizarTarefa = async (id, dados) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  });
  return await res.json();
};

export const deletarTarefa = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
};

export const marcarComoConcluida = async (id) => {
  await fetch(`${API_URL}/${id}/concluir`, { method: 'PATCH' });
};
