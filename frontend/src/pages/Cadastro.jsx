import React, { useState } from 'react';
import './Login.css'; // Importa estilos para o componente

// Componente para a tela de cadastro de usuário
function Cadastro() {
  // Estados para controlar os campos do formulário
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  // Função que trata o envio do formulário de cadastro
  const handleCadastro = async (e) => {
    e.preventDefault();

    // Validação simples para garantir que as senhas coincidem
    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    try {
      // Envia a requisição POST para a API de cadastro com email e senha
      const resposta = await fetch('http://localhost:3001/api/usuarios/cadastrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      });

      const dados = await resposta.json();

      // Se cadastro for bem-sucedido, alerta e redireciona para login
      if (resposta.ok) {
        alert('Cadastro realizado com sucesso!');
        window.location.href = '/login';
      } else {
        // Caso haja erro, exibe mensagem retornada pela API
        alert(dados.erro || 'Erro ao cadastrar');
      }
    } catch (erro) {
      // Trata erros de conexão ou falha na requisição
      console.error('Erro na requisição:', erro);
      alert('Erro ao conectar com o servidor');
    }
  };

  return (
    <div className="login-container">
      {/* Formulário de cadastro com evento onSubmit */}
      <form className="login-form" onSubmit={handleCadastro}>
        <h1>Cadastro</h1>

        {/* Campo para inserir email */}
        <input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Campo para inserir senha */}
        <input
          type="password"
          placeholder="Sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        {/* Campo para confirmar senha */}
        <input
          type="password"
          placeholder="Confirme a senha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          required
        />

        {/* Botão para enviar formulário */}
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default Cadastro;
