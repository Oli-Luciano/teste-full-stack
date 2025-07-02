import { useState } from 'react';

// Componente responsável por exibir e gerenciar a lista de tarefas
function TodoList({ tarefas, marcarComoConcluida, editarTarefa, excluirTarefa }) {
  const [modoEdicao, setModoEdicao] = useState(null); // ID da tarefa em edição
  const [textoEditado, setTextoEditado] = useState(''); // Texto temporário da edição

  // Inicia a edição de uma tarefa
  const iniciarEdicao = (tarefa) => {
    setModoEdicao(tarefa.id);
    setTextoEditado(tarefa.texto);
  };

  // Salva o novo texto editado da tarefa
  const salvarEdicao = (id) => {
    editarTarefa(id, textoEditado);
    setModoEdicao(null);
  };

  return (
    <ul className="lista">
      {tarefas.map((tarefa) => (
        <li key={tarefa.id} className={tarefa.concluida ? 'concluida' : ''}>
          {modoEdicao === tarefa.id ? (
            <>
              <input
                type="text"
                value={textoEditado}
                onChange={(e) => setTextoEditado(e.target.value)}
              />
              <button onClick={() => salvarEdicao(tarefa.id)}>Salvar</button>
              <button onClick={() => setModoEdicao(null)}>Cancelar</button>
            </>
          ) : (
            <>
              <span onClick={() => marcarComoConcluida(tarefa.id)}>
                {tarefa.texto}
              </span>
              <button onClick={() => iniciarEdicao(tarefa)}>✏️</button>
              <button onClick={() => excluirTarefa(tarefa.id)}>🗑️</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
