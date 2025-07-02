// src/App.jsx
import { useState } from 'react';
import Header from './components/header';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [temaClaro, setTemaClaro] = useState(true);
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');

  const alternarTema = () => setTemaClaro(!temaClaro);

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

  const marcarComoConcluida = (id) => {
    setTarefas(tarefas.map(t =>
      t.id === id ? { ...t, concluida: !t.concluida } : t
    ));
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
        />
      </main>
    </div>
  );
}

export default App;
