const session = require('express-session');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded bodies
app.use(express.json());  // Parse JSON bodies

app.set('view engine', 'ejs');
app.set('views', './views'); // Caminho onde estão os arquivos .ejs

app.use(session({
  secret: 'segredo_tcc', // idealmente, isso deve vir de uma variável de ambiente
  resave: false,
  saveUninitialized: false
}));

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

  bcrypt.hash(senha, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ message: 'Erro ao criar a senha' });
    users.push({ nome, sobrenome, email, senha: hashedPassword });
    return res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
  });
});

// Rota de login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (user) {
    bcrypt.compare(password, user.senha, (err, isMatch) => {
      if (isMatch) {
        req.session.userId = user.email; // Armazena o email do usuário na sessão
        return res.status(200).json({ message: 'Login bem-sucedido' });
      }
      return res.status(401).json({ message: 'Credenciais inválidas' });
    });
  } else {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }
});

// Rota para o perfil do usuário (agora renderizando o dashboard.ejs)
app.get('/perfil', (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login'); // Redireciona para a página de login se não estiver logado
  }

  const user = users.find(u => u.email === req.session.userId);
  if (user) {
    return res.render('dashboard', { user }); // Renderiza o dashboard.ejs, passando os dados do usuário
  } else {
    return res.status(401).json({ message: 'Usuário não encontrado' });
  }
});

// Rota de logout (opcional)
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao sair' });
    }
    res.status(200).json({ message: 'Logout bem-sucedido' });
  });
});

// Rota principal para verificar se o usuário está logado
app.get('/', (req, res) => {
  if (req.session.userId) {
    return res.redirect('/perfil'); // Redireciona para o perfil se estiver logado
  } else {
    return res.redirect('/login'); // Redireciona para a página de login se não estiver logado
  }
});

app.get('/verificar-sessao', (req, res) => {
  if (req.session.userId) {
    return res.status(200).json({ autenticado: true });
  }
  return res.status(200).json({ autenticado: false });
});
// Rota para verificar se o usuário está autenticado
app.get('/verificar-sessao', (req, res) => {
  if (req.session.userId) {
    return res.status(200).json({ autenticado: true });
  }
  return res.status(200).json({ autenticado: false });
});

// Rota para o dashboard (perfil do usuário)
app.get('/dashboard', (req, res) => {
  if (req.session.userId) {
    res.render('dashboard'); // Renderiza o arquivo dashboard.ejs
  } else {
    res.redirect('/login.html'); // Redireciona para o login se não estiver logado
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});


