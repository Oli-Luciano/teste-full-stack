// Importações principais de bibliotecas e componentes
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/header';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Login from './pages/login.jsx';
import Cadastro from './pages/Cadastro.jsx';

// Importação dos serviços da API para manipular tarefas
import {
  listarTarefas,
  adicionarTarefa as apiAdicionar,
  atualizarTarefa,
  deletarTarefa,
  marcarComoConcluida as apiConcluir
} from './services/api';

import './App.css';

// Função auxiliar que verifica se o usuário está autenticado com token salvo
const isAuthenticated = () => {
  return localStorage.getItem('token');
};

// Componente principal da Home, com funcionalidades da lista de tarefas
function Home() {
  const [temaClaro, setTemaClaro] = useState(true);              
  const [tarefas, setTarefas] = useState([]);                    
  const [novaTarefa, setNovaTarefa] = useState('');              
  const [filtro, setFiltro] = useState('todas');                 

  useEffect(() => {
    carregarTarefas();                                          
  }, []);

  // Busca as tarefas da API e atualiza o estado
  const carregarTarefas = async () => {
    try {
      const dados = await listarTarefas();
      setTarefas(dados);
    } catch (error) {
      console.error('Erro ao carregar tarefas', error);
    }
  };

  // Adiciona uma nova tarefa à lista e limpa o campo de input
  const adicionarTarefa = async () => {
    if (novaTarefa.trim() === '') return;
    try {
      const nova = await apiAdicionar(novaTarefa);
      setTarefas([...tarefas, nova]);
      setNovaTarefa('');
    } catch (error) {
      console.error('Erro ao adicionar tarefa', error);
    }
  };

  // Marca uma tarefa como concluída (ou reverte se já estiver concluída)
  const marcarComoConcluida = async (id) => {
    try {
      await apiConcluir(id);
      setTarefas(tarefas.map(t =>
        t.id === id ? { ...t, concluida: !t.concluida } : t
      ));
    } catch (error) {
      console.error('Erro ao marcar como concluída', error);
    }
  };

  // Atualiza o texto de uma tarefa (edição)
  const editarTarefa = async (id, novoTexto) => {
    try {
      await atualizarTarefa(id, { titulo: novoTexto });
      setTarefas(tarefas.map(t =>
        t.id === id ? { ...t, titulo: novoTexto } : t
      ));
    } catch (error) {
      console.error('Erro ao editar tarefa', error);
    }
  };

  // Remove uma tarefa da lista
  const excluirTarefa = async (id) => {
    try {
      await deletarTarefa(id);
      setTarefas(tarefas.filter(t => t.id !== id));
    } catch (error) {
      console.error('Erro ao excluir tarefa', error);
    }
  };

  // Aplica o filtro de tarefas (todas, pendentes ou concluídas)
  const tarefasFiltradas = tarefas.filter(t => {
    if (filtro === 'pendentes') return !t.concluida;
    if (filtro === 'concluidas') return t.concluida;
    return true;
  });

  // Alterna entre tema claro e escuro
  const alternarTema = () => setTemaClaro(!temaClaro);

  return (
    <div className={temaClaro ? 'app claro' : 'app escuro'}>
      {/* Cabeçalho com botão de tema e logout */}
      <Header temaClaro={temaClaro} alternarTema={alternarTema} />
      
      <main>
        {/* Formulário para adicionar novas tarefas */}
        <TodoForm
          novaTarefa={novaTarefa}
          setNovaTarefa={setNovaTarefa}
          adicionarTarefa={adicionarTarefa}
        />

        {/* Botões para filtrar visualização das tarefas */}
        <div className="filtros">
          <button onClick={() => setFiltro('todas')} className={filtro === 'todas' ? 'ativo' : ''}>
            Todas
          </button>
          <button onClick={() => setFiltro('pendentes')} className={filtro === 'pendentes' ? 'ativo' : ''}>
            Pendentes
          </button>
          <button onClick={() => setFiltro('concluidas')} className={filtro === 'concluidas' ? 'ativo' : ''}>
            Concluídas
          </button>
        </div>

        {/* Lista de tarefas exibida com base no filtro atual */}
        <TodoList
          tarefas={tarefasFiltradas}
          marcarComoConcluida={marcarComoConcluida}
          editarTarefa={editarTarefa}
          excluirTarefa={excluirTarefa}
        />
      </main>
    </div>
  );
}

// Componente principal da aplicação, gerencia as rotas protegidas e públicas
function App() {
  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        {/* Se estiver autenticado, carrega Home, senão redireciona para login */}
        <Route path="/" element={isAuthenticated() ? <Home /> : <Navigate to="/login" replace />} />
      </Routes>
  );
}

export default App;
