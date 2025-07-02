// src/components/TodoList.jsx
function TodoList({ tarefas, marcarComoConcluida }) {
  return (
    <ul className="lista">
      {tarefas.map((tarefa) => (
        <li
          key={tarefa.id}
          className={tarefa.concluida ? 'concluida' : ''}
          onClick={() => marcarComoConcluida(tarefa.id)}
        >
          {tarefa.texto}
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
