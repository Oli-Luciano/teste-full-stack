import { useState } from 'react';
import Header from './components/header';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [temaClaro, setTemaClaro] = useState(true);
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');

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
        <TodoForm
          novaTarefa={novaTarefa}
          setNovaTarefa={setNovaTarefa}
          adicionarTarefa={adicionarTarefa}
        />
        <TodoList
          tarefas={tarefas}
          marcarComoConcluida={marcarComoConcluida}
          editarTarefa={editarTarefa}
          excluirTarefa={excluirTarefa}
        />
      </main>
    </div>
  );
}

export default App;
