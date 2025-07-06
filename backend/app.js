import express from 'express';
import cors from 'cors';
import tarefasRotas from './rotas/tarefas.js';
import usuariosRotas from './rotas/usuarios.js';
import dotenv from 'dotenv';

// Carrega variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();
const PORT = 3001;

// Habilita o uso do CORS para permitir requisições de outros domínios (ex: frontend)
app.use(cors());

// Permite que a API aceite requisições com JSON no corpo
app.use(express.json());

// Rotas da API relacionadas a tarefas
app.use('/api/tarefas', tarefasRotas);

// Rotas da API relacionadas a usuários (login e cadastro)
app.use('/api/usuarios', usuariosRotas);

// Rota raiz para teste rápido da API
app.get('/', (req, res) => {
  res.send('API de Tarefas funcionando!');
});

// Inicia o servidor na porta definida e exibe mensagem no console
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

