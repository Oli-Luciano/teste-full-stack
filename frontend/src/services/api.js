import axios from 'axios';

// Criação da instância da API com a base URL da aplicação backend
const api = axios.create({
  baseURL: 'http://localhost:3001/api'
});

// Interceptor que é executado antes de cada requisição.
// Ele verifica se há um token JWT no localStorage e, se houver, o adiciona no cabeçalho Authorization.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Função para obter todas as tarefas do usuário autenticado
export const listarTarefas = async () => {
  const res = await api.get('/tarefas');
  return res.data;
};

// Função para adicionar uma nova tarefa com o título fornecido
export const adicionarTarefa = async (descricao) => {
  const res = await api.post('/tarefas', { titulo: descricao });
  return res.data;
};

// Função para atualizar uma tarefa específica com novos dados
export const atualizarTarefa = async (id, dados) => {
  const res = await api.put(`/tarefas/${id}`, dados);
  return res.data;
};

// Função para excluir uma tarefa específica
export const deletarTarefa = async (id) => {
  await api.delete(`/tarefas/${id}`);
};

// Função para marcar uma tarefa como concluída
export const marcarComoConcluida = async (id) => {
  await api.patch(`/tarefas/${id}/concluir`);
};

// Exporta a instância da API para outros usos, se necessário
export default api;
