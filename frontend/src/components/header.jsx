// src/components/Header.jsx
function Header({ temaClaro, alternarTema }) {
  return (
    <header className="header">
      <h1>📝 Minhas Tarefas</h1>
      <button onClick={alternarTema}>
        {temaClaro ? '🌙' : '☀️'}
      </button>
    </header>
  );
}

export default Header;
