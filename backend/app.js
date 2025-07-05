import express from 'express';
import cors from 'cors';
import tarefasRotas from './rotas/tarefas.js'; // ⬅️ .js é obrigatório

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/api/tarefas', tarefasRotas);

app.get('/', (req, res) => {
  res.send('API de Tarefas funcionando!');
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
