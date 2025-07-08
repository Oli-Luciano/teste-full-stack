# 📝 To-Do List com Autenticação de Usuários

Este projeto é uma aplicação web Full Stack de gerenciamento de tarefas (To-Do List) com funcionalidades completas de **CRUD** e **login de usuários**, desenvolvida como parte de um desafio técnico para a vaga de Desenvolvedor(a) Full Stack.

---

## 🚀 Tecnologias Utilizadas

### 🔧 Backend
- Node.js
- Express
- MySQL
- CORS
- ESModules

### 🎨 Frontend
- React
- Vite
- Axios
- CSS3 (modo claro/escuro)

---

## 📂 Estrutura de Pastas

```
/teste-full-stack
├── backend
│   ├── app.js
│   ├── banco.js
│   ├── modelos/
│   │   ├── Tarefa.js
│   │   └── Usuario.js
│   ├── controladores/
│   │   ├── tarefasController.js
│   │   └── usuariosController.js
│   ├── middlewares/
│   │   └── auth.js
│   ├── rotas/
│   │   ├── tarefas.js
│   │   └── usuarios.js
│   └── scripts/
│       └── cadastrarUsuario.js
|
├── frontend
│   ├── public/
│   └── src/
│       ├── App.jsx
│       ├── Login.jsx
│       ├── assets/
│       ├── components/
│       │   ├── Header.jsx
│       │   ├── TodoForm.jsx
│       │   ├── TodoList.jsx
│       │   └── pages/
│       │       ├── Cadastro.jsx
│       │       ├── Login.jsx
│       │       └── login.css
│       └── services/
│           └── api.js
|
└── README.md

```

---

## 🔐 Funcionalidades

- [x] Adicionar, editar e excluir tarefas
- [x] Marcar tarefas como concluídas
- [x] Filtro de tarefas (todas, pendentes, concluídas)
- [x] Autenticação de usuários com login
- [x] Interface responsiva e tema escuro/claro

---

## ⚙️ Como Executar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/Oli-Luciano/teste-full-stack.git
cd teste-full-stack
```
---

### 2. Configure o ambiente

#### Crie o arquivo `.env`:

Copie o `.env.example`:

```bash
cp backend/.env.example backend/.env
```

Edite o `.env` com suas informações:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=tarefas_db
PORT=3001
JWT_SECRET=segredo_super_secreto
```

---

### 3. Configure o banco de dados

No MySQL:

```sql
CREATE DATABASE IF NOT EXISTS tarefas_db DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

USE tarefas_db;

CREATE TABLE IF NOT EXISTS tarefas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  concluida BOOLEAN DEFAULT FALSE,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL
);

ALTER TABLE tarefas ADD COLUMN usuario_id INT;
SET SQL_SAFE_UPDATES = 0;
UPDATE tarefas SET usuario_id = 1;

ALTER TABLE tarefas
ADD CONSTRAINT fk_usuario
FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
ON DELETE CASCADE;

---

### 4. Backend (porta 3001)

```bash
cd backend
npm install
node app.js
```

---

### 5. Frontend (porta 5173)

```bash
cd frontend
npm install
npm run dev
```

---

## 🧪 Login de Teste

```
Email: teste@teste.com
Senha: 123
```

---

## 🧑‍💻 Autor

**Luciano Oliveira**  
Estudante de Ciência da Computação | Desenvolvedor Full Stack  
📧 luciano.c.oliveira32@gmail.com  
🔗 [LinkedIn](https://www.linkedin.com/in/luciano-oliveira-28baa2273/)

---