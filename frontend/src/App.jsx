import { useState, useEffect } from 'react';
import Header from './components/header';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import {
  listarTarefas,
  adicionarTarefa as apiAdicionar,
  atualizarTarefa,
  deletarTarefa,
  marcarComoConcluida as apiConcluir
} from './services/api';
import './App.css';

function App() {
  const [temaClaro, setTemaClaro] = useState(true);
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');
  const [filtro, setFiltro] = useState('todas');

  useEffect(() => {
    carregarTarefas();
  }, []);

  const carregarTarefas = async () => {
    try {
      const dados = await listarTarefas();
      setTarefas(dados);
    } catch (error) {
      console.error('Erro ao carregar tarefas', error);
    }
  };

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

  const excluirTarefa = async (id) => {
    try {
      await deletarTarefa(id);
      setTarefas(tarefas.filter(t => t.id !== id));
    } catch (error) {
      console.error('Erro ao excluir tarefa', error);
    }
  };

  const tarefasFiltradas = tarefas.filter(t => {
    if (filtro === 'pendentes') return !t.concluida;
    if (filtro === 'concluidas') return t.concluida;
    return true;
  });

  const alternarTema = () => setTemaClaro(!temaClaro);

  return (
    <div className={temaClaro ? 'app claro' : 'app escuro'}>
      <Header temaClaro={temaClaro} alternarTema={alternarTema} />
      <main>
        <TodoForm
          novaTarefa={novaTarefa}
          setNovaTarefa={setNovaTarefa}
          adicionarTarefa={adicionarTarefa}
        />

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
