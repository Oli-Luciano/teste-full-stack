// Importa os módulos necessários
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env
const tarefasRotas = require('./rotas/tarefasRotas'); // Importa as rotas de tarefas

const app = express();
const PORT = process.env.PORT || 3001; // Define a porta do servidor (do .env ou padrão 3001)

// Aplica o middleware CORS para permitir requisições de outros domínios (como o frontend)
app.use(cors());

// Middleware para aceitar requisições com corpo JSON
app.use(express.json());

// Define o prefixo '/api/tarefas' para as rotas relacionadas às tarefas
app.use('/api/tarefas', tarefasRotas);

// Inicia o servidor na porta especificada e exibe uma mensagem no terminal
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

