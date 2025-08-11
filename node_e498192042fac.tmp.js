const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const Usuario = require('./models/usuario');
const session = require('express-session');
require('dotenv').config();

const app = express();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB conectado!'))
.catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

// Sessão com cookie persistente
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,             // true se HTTPS
    maxAge: 1000 * 60 * 60 * 24 * 7 // 7 dias
  }
}));

// Rotas GET
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/pagina_inicial/index.html'));
});

app.get('/login', (req, res) => {
  if (req.session.usuario) return res.redirect('/dashboard');
  res.sendFile(path.join(__dirname, 'views/login/index.html'));
});

app.get('/cadastro', (req, res) => {
  if (req.session.usuario) return res.redirect('/conta-usuario');
  res.sendFile(path.join(__dirname, 'views/cadastro/index.html'));
});

app.get('/dashboard', (req, res) => {
  if (!req.session.usuario) return res.redirect('/login');
  res.sendFile(path.join(__dirname, 'views/conta-usuario/index.html'));
});

// POST: Cadastro
app.post('/cadastro', async (req, res) => {
  const { nome, sobrenome, email, senha } = req.body;

  if (!nome || !sobrenome || !email || !senha) {
    return res.status(400).json({ erro: 'Preencha todos os campos.' });
  }

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ erro: 'Email inválido.' });
  }

  const usuarioExistente = await Usuario.findOne({ email });
  if (usuarioExistente) {
    return res.status(400).json({ erro: 'Usuário já existe!' });
  }

  try {
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novoUsuario = new Usuario({
      nome,
      sobrenome,
      email,
      senha: senhaCriptografada
    });

    await novoUsuario.save();
    res.status(200).json({ sucesso: 'Cadastro realizado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao criar usuário.' });
  }
});

// POST: Login
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  const usuario = await Usuario.findOne({ email });

  if (!usuario) return res.status(400).json({ erro: 'Usuário não encontrado' });

  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
  if (!senhaCorreta) return res.status(400).json({ erro: 'Senha incorreta' });

  req.session.usuario = {
    id: usuario._id,
    nome: usuario.nome,
    sobrenome: usuario.sobrenome,
    email: usuario.email
  };

  res.status(200).json({ sucesso: 'Login realizado com sucesso!' });
});

// GET: Verificar usuário logado
app.get('/usuario-logado', (req, res) => {
  if (!req.session.usuario) {
    return res.status(401).json({ erro: 'Usuário não autenticado' });
  }

  res.json({
    nome: req.session.usuario.nome,
    email: req.session.usuario.email,
    telefone: req.session.usuario.telefone,
    cpf: req.session.usuario.cpf,
    endereco: req.session.usuario.endereco,
    cidade: req.session.usuario.cidade,
    estado: req.session.usuario.estado,
    cep: req.session.usuario.cep
  });
});

// POST: Atualizar dados do usuário
app.post('/atualizar-dados', async (req, res) => {
  if (!req.session.usuario) {
    return res.status(401).json({ erro: 'Usuário não autenticado' });
  }

  const { nome, email, telefone, cpf, endereco, cidade, estado, cep } = req.body;

  try {
    const usuarioAtualizado = await Usuario.findByIdAndUpdate(
      req.session.usuario.id,
      { nome, email, telefone, cpf, endereco, cidade, estado, cep },
      { new: true }
    );

    req.session.usuario = {
      id: usuarioAtualizado._id,
      nome: usuarioAtualizado.nome,
      sobrenome: usuarioAtualizado.sobrenome,
      email: usuarioAtualizado.email,
      telefone: usuarioAtualizado.telefone,
      cpf: usuarioAtualizado.cpf,
      endereco: usuarioAtualizado.endereco,
      cidade: usuarioAtualizado.cidade,
      estado: usuarioAtualizado.estado,
      cep: usuarioAtualizado.cep
    };

    res.status(200).json({ sucesso: 'Dados atualizados com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao atualizar dados' });
  }
});

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
