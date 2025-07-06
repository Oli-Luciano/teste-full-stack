import { StrictMode } from 'react' 
// Importa StrictMode, que ajuda a detectar problemas no código React durante o desenvolvimento

import { createRoot } from 'react-dom/client' 
// Importa a função createRoot para criar o ponto de montagem da aplicação no DOM (React 18+)

import { BrowserRouter } from 'react-router-dom' 
// Importa o BrowserRouter para habilitar o roteamento baseado no histórico do navegador

import './index.css' 
// Importa o arquivo CSS principal para estilização global da aplicação

import App from './App.jsx' 
// Importa o componente principal da aplicação, que contém toda a estrutura e lógica

// Cria a raiz React no elemento do DOM com id 'root' e renderiza a aplicação dentro dele
createRoot(document.getElementById('root')).render(
  <StrictMode> {/* Envolve a aplicação para ativar verificações e avisos adicionais */}
    <BrowserRouter> {/* Envolve para habilitar roteamento via URL */}
      <App /> {/* Componente principal que representa toda a aplicação */}
    </BrowserRouter>
  </StrictMode>,
)

