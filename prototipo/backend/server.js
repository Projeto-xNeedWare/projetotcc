const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Lista de usuários cadastrados
const users = [];

// Rota de cadastro
app.post('/cadastro', (req, res) => {
  const { nome, sobrenome, email, senha, confirmSenha } = req.body;

  if (!nome || !sobrenome || !email || !senha || !confirmSenha) {
    return res.status(400).json({ message: 'Preencha todos os campos' });
  }

  if (senha !== confirmSenha) {
    return res.status(400).json({ message: 'As senhas não coincidem' });
  }

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(409).json({ message: 'Email já cadastrado' });
  }

  users.push({ nome, sobrenome, email, senha });
  return res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
});

// Rota de login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.senha === password);
  if (user) {
    return res.status(200).json({ message: 'Login bem-sucedido' });
  }

  return res.status(401).json({ message: 'Credenciais inválidas' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});