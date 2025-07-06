import bcrypt from 'bcrypt';
import Usuario from '../modelos/Usuario.js';
import jwt from 'jsonwebtoken';

// Função responsável por autenticar o usuário e gerar um token JWT em caso de sucesso
const login = (req, res) => {
  const { email, senha } = req.body;

  // Busca o usuário no banco de dados pelo e-mail
  Usuario.buscarPorEmail(email, (erro, resultados) => {
    if (erro) return res.status(500).json({ erro: 'Erro no servidor' });
    if (resultados.length === 0) return res.status(401).json({ erro: 'Usuário não encontrado' });

    const usuario = resultados[0];

    // Compara a senha fornecida com a senha armazenada (criptografada)
    bcrypt.compare(senha, usuario.senha, (err, match) => {
      if (match) {
        // Gera o token de autenticação com validade de 1 hora
        const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ mensagem: 'Login bem-sucedido', token });
      } else {
        res.status(401).json({ erro: 'Senha incorreta' });
      }
    });
  });
};

// Função responsável por cadastrar um novo usuário, verificando duplicidade e criptografando a senha
const cadastrar = (req, res) => {
  const { email, senha } = req.body;

  // Verifica se o e-mail já está cadastrado
  Usuario.buscarPorEmail(email, async (erro, resultados) => {
    if (erro) return res.status(500).json({ erro: 'Erro no servidor' });
    if (resultados.length > 0) return res.status(400).json({ erro: 'Email já cadastrado' });

    try {
      // Gera o hash da senha e salva o novo usuário no banco
      const hash = await bcrypt.hash(senha, 10);
      Usuario.inserir(email, hash, (err, resultado) => {
        if (err) return res.status(500).json({ erro: 'Erro ao cadastrar usuário' });
        res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso' });
      });
    } catch (e) {
      res.status(500).json({ erro: 'Erro ao gerar hash da senha' });
    }
  });
};

// Exporta as funções para serem usadas nas rotas
export { login, cadastrar };
