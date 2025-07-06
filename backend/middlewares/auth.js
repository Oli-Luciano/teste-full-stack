import jwt from 'jsonwebtoken';

// Middleware para autenticar o token JWT enviado no cabeçalho da requisição
const autenticarToken = (req, res, next) => {
  // Recupera o cabeçalho de autorização (ex: "Bearer TOKEN")
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ erro: 'Token não fornecido' });

  // Extrai apenas o token da string (descarta a palavra "Bearer")
  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ erro: 'Token inválido' });

  // Verifica se o token é válido e decodifica o payload
  jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
    if (err) return res.status(403).json({ erro: 'Token inválido ou expirado' });

    // Armazena o ID do usuário no objeto da requisição para uso posterior
    req.usuarioId = usuario.id;
    next(); // Chama o próximo middleware ou rota
  });
};

// Exporta o middleware para uso em rotas protegidas
export default autenticarToken;

