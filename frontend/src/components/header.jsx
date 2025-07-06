import { useNavigate } from 'react-router-dom';

// Componente Header que recebe props para controle de tema e função para alternar tema
function Header({ temaClaro, alternarTema }) {
  const navigate = useNavigate(); // Hook para navegação programática no React Router

  // Função para deslogar o usuário removendo dados do localStorage e redirecionando para login
  const handleLogout = () => {
    localStorage.removeItem('token');          // Remove o token JWT armazenado
    localStorage.removeItem('usuarioLogado');  // Remove o identificador do usuário logado
    navigate('/login');                         // Redireciona para a página de login
  };

  return (
    <header className="header">
      <h1>📝 Minhas Tarefas</h1>

      {/* Botões para alternar tema e para sair (logout) */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button onClick={alternarTema}>
          {/* Mostra ícone e texto conforme o tema atual */}
          {temaClaro ? '🌙' : '☀️'}
        </button>

        <button onClick={handleLogout}>
          🔓 Sair
        </button>
      </div>
    </header>
  );
}

export default Header;
