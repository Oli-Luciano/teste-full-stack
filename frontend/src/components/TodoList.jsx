import { useState } from 'react';

// Componente responsável por exibir e gerenciar a lista de tarefas
function TodoList({ tarefas, marcarComoConcluida, editarTarefa, excluirTarefa }) {
  const [modoEdicao, setModoEdicao] = useState(null); // ID da tarefa em edição
  const [textoEditado, setTextoEditado] = useState(''); // Texto temporário da edição

  // Inicia a edição de uma tarefa
  const iniciarEdicao = (tarefa) => {
    setModoEdicao(tarefa.id);
    setTextoEditado(tarefa.titulo);
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
          {/* Verifica se a tarefa está em modo de edição */}
          {modoEdicao === tarefa.id ? (
            <>
              {/* Campo para editar o título da tarefa */}
              <input
                type="text"
                value={textoEditado}
                onChange={(e) => setTextoEditado(e.target.value)}
              />
              {/* Botão para salvar a edição */}
              <button onClick={() => salvarEdicao(tarefa.id)}>Salvar</button>
              {/* Botão para cancelar a edição */}
              <button onClick={() => setModoEdicao(null)}>Cancelar</button>
            </>
          ) : (
            <>
              {/* Exibe o título da tarefa, clicável para marcar como concluída */}
              <span onClick={() => marcarComoConcluida(tarefa.id)}>
                {tarefa.titulo}
              </span>
              {/* Botão para iniciar a edição da tarefa */}
              <button onClick={() => iniciarEdicao(tarefa)}>✏️</button>
              {/* Botão para excluir a tarefa */}
              <button onClick={() => excluirTarefa(tarefa.id)}>🗑️</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TodoList;

