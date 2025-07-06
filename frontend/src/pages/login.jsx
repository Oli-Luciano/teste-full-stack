import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css'; 

// Componente de Login responsável pela autenticação do usuário
function Login() {
  // Estados locais para armazenar os valores digitados nos campos de e-mail e senha
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // Função que lida com o envio do formulário de login
  const handleLogin = async (e) => {
    e.preventDefault(); // Evita o recarregamento da página ao enviar o formulário

    try {
      // Envia uma requisição POST para a API de login com os dados informados
      const response = await fetch('http://localhost:3001/api/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      });

      const data = await response.json();

      // Se a autenticação for bem-sucedida, salva o token no localStorage e redireciona
      if (response.ok) {
        localStorage.setItem('token', data.token); 
        window.location.href = '/'; 
      } else {
        alert(data.erro || 'Credenciais inválidas!');
      }
    } catch (error) {
      // Exibe mensagem de erro em caso de falha na comunicação com o servidor
      console.error('Erro ao conectar com o servidor:', error);
      alert('Erro ao conectar com o servidor. Tente novamente.');
    }
  };

  return (
    <div className="login-container">
      {/* Formulário de login estilizado */}
      <form className="login-form" onSubmit={handleLogin}>
        <h1>Login</h1>

        {/* Campo de e-mail com bind ao estado */}
        <input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Campo de senha com bind ao estado */}
        <input
          type="password"
          placeholder="Sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        {/* Botão para enviar o formulário de login */}
        <button type="submit">Entrar</button>

        {/* Link para página de cadastro, caso o usuário ainda não tenha conta */}
        <div className="login-link">
          <span>Não tem conta? </span>
          <Link to="/cadastro">Cadastre-se</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
