import express from 'express';
import { login, cadastrar } from '../controladores/usuarios.js';

const router = express.Router();

// Rota para login de usuário (gera token JWT se credenciais forem válidas)
router.post('/login', login);

// Rota para cadastro de novo usuário (verifica duplicidade e salva senha criptografada)
router.post('/cadastrar', cadastrar); // ⬅ nova rota de cadastro

// Exporta o router para ser usado no arquivo principal da aplicação
export default router;

