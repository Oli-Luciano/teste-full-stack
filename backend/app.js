const express = require('express');
const cors = require('cors');
const tarefasRotas = require('./rotas/tarefas');

const app = express();
const PORT = 3001; // Porta do backend

// Middleware
app.use(cors());
app.use(express.json()); // Permite ler JSON no corpo da requisição

// Rotas
app.use('/api/tarefas', tarefasRotas);

// Rota inicial só para teste
app.get('/', (req, res) => {
  res.send('API de Tarefas funcionando!');
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
