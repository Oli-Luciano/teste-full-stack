import { useState, useEffect } from 'react';
import Header from './components/header';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [temaClaro, setTemaClaro] = useState(true);
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');
  const [filtro, setFiltro] = useState('todas');

  // Carregar tarefas do backend ao iniciar o componente
  useEffect(() => {
    carregarTarefas();
  }, []);

  async function carregarTarefas() {
    try {
      const resposta = await api.get('/tarefas');
      setTarefas(resposta.data);
    } catch (error) {
      console.error('Erro ao carregar tarefas', error);
    }
  }

  // Filtra as tarefas com base no filtro selecionado: retorna todas, apenas pendentes ou apenas concluídas
  const tarefasFiltradas = tarefas.filter(t => {
    if (filtro === 'pendentes') return !t.concluida;
    if (filtro === 'concluidas') return t.concluida;
    return true;
  });

  // Alterna entre tema claro e escuro
  const alternarTema = () => setTemaClaro(!temaClaro);

  // Adiciona uma nova tarefa à lista
  const adicionarTarefa = () => {
    if (novaTarefa.trim() === '') return;
    const nova = {
      id: Date.now(),
      texto: novaTarefa,
      concluida: false
    };
    setTarefas([...tarefas, nova]);
    setNovaTarefa('');
  };

  // Marca ou desmarca uma tarefa como concluída
  const marcarComoConcluida = (id) => {
    setTarefas(tarefas.map(t =>
      t.id === id ? { ...t, concluida: !t.concluida } : t
    ));
  };

  // Edita o texto de uma tarefa existente
  const editarTarefa = (id, novoTexto) => {
    setTarefas(tarefas.map(t =>
      t.id === id ? { ...t, texto: novoTexto } : t
    ));
  };

  // Remove uma tarefa da lista
  const excluirTarefa = (id) => {
    setTarefas(tarefas.filter(t => t.id !== id));
  };

  return (
    <div className={temaClaro ? 'app claro' : 'app escuro'}>
      <Header temaClaro={temaClaro} alternarTema={alternarTema} />
      <main>
        {/* Formulário para adicionar uma nova tarefa */}
        <TodoForm
          novaTarefa={novaTarefa}
          setNovaTarefa={setNovaTarefa}
          adicionarTarefa={adicionarTarefa}
        />

        {/* Botões para filtrar a visualização das tarefas */}
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

        {/* Lista de tarefas (filtradas), com funções de marcar como concluída, editar e excluir */}
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



export default App;
