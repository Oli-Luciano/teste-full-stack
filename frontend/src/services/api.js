import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api'
});

export const listarTarefas = async () => {
  const res = await api.get('/tarefas');
  return res.data;
};

export const adicionarTarefa = async (descricao) => {
  const res = await api.post('/tarefas', { titulo: descricao });
  return res.data;
};

export const atualizarTarefa = async (id, dados) => {
  const res = await api.put(`/tarefas/${id}`, dados);
  return res.data;
};

export const deletarTarefa = async (id) => {
  await api.delete(`/tarefas/${id}`);
};

export const marcarComoConcluida = async (id) => {
  await api.patch(`/tarefas/${id}/concluir`);
};
export default api;