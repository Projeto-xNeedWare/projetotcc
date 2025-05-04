const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Simulação de usuário (sem banco por enquanto)
const fakeUser = {
  email: 'teste@email.com',
  password: '123456'
};

// Rota de login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === fakeUser.email && password === fakeUser.password) {
    return res.status(200).json({ message: 'Login bem-sucedido' });
  }

  return res.status(401).json({ message: 'Credenciais inválidas' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});