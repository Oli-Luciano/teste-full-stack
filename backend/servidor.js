const express = require('express');
const cors = require('cors');
require('dotenv').config();
const tarefasRotas = require('./rotas/tarefasRotas');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/tarefas', tarefasRotas);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
