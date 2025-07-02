
function TodoForm({ novaTarefa, setNovaTarefa, adicionarTarefa }) {
  return (
    <div className="formulario">
      <input
        type="text"
        placeholder="Digite uma nova tarefa..."
        value={novaTarefa}
        onChange={(e) => setNovaTarefa(e.target.value)}
      />
      <button onClick={adicionarTarefa}>Adicionar</button>
    </div>
  );
}

export default TodoForm;
