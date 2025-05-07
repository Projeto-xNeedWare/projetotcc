// Importa o módulo 'express-session' para gerenciar sessões no servidor
const session = require('express-session');

// Importa o framework Express, que facilita a criação do servidor e rotas
const express = require('express');

// Importa o CORS para permitir que o frontend (em outro endereço) acesse o backend
const cors = require('cors');

// Importa o bcryptjs, usado para criptografar e comparar senhas de forma segura
const bcrypt = require('bcryptjs');

// Cria uma instância do aplicativo Express
const app = express();

// Define a porta em que o servidor vai rodar
const PORT = 3000;

// Ativa o CORS para permitir requisições de outras origens (ex: HTML local)
app.use(cors());

// Habilita o servidor a ler dados enviados por formulários no formato URL-encoded
app.use(express.urlencoded({ extended: true }));

// Habilita o servidor a interpretar dados JSON enviados pelo frontend
app.use(express.json());

// Define o mecanismo de visualização para EJS (permite usar arquivos .ejs como páginas dinâmicas)
app.set('view engine', 'ejs');

// Define o diretório onde estão os arquivos .ejs
app.set('views', './views');

// Configura a sessão de usuário (armazenamento temporário no servidor)
app.use(session({
  secret: 'segredo_tcc', // Chave secreta usada para criptografar a sessão (ideal usar variável de ambiente)
  resave: false, // Não salva a sessão novamente se nada foi alterado
  saveUninitialized: false // Não cria uma nova sessão se nenhuma informação for salva
}));

// Simula um "banco de dados" com um array de usuários na memória
const users = [];

// ==========================
// ROTA DE CADASTRO (POST)
// ==========================
app.post('/cadastro', (req, res) => {
  // Pega os dados enviados pelo formulário (nome, sobrenome, email, senha e confirmação)
  const { nome, sobrenome, email, senha, confirmSenha } = req.body;

  // Verifica se todos os campos foram preenchidos
  if (!nome || !sobrenome || !email || !senha || !confirmSenha) {
    return res.status(400).json({ message: 'Preencha todos os campos' });
  }

  // Verifica se as senhas coincidem
  if (senha !== confirmSenha) {
    return res.status(400).json({ message: 'As senhas não coincidem' });
  }

  // Verifica se já existe um usuário com esse e-mail
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(409).json({ message: 'Email já cadastrado' });
  }

  // Criptografa a senha com bcrypt (10 saltos)
  bcrypt.hash(senha, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ message: 'Erro ao criar a senha' });

    // Adiciona o novo usuário à lista de usuários com a senha criptografada
    users.push({ nome, sobrenome, email, senha: hashedPassword });

    // Retorna mensagem de sucesso
    return res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
  });
});

// ==========================
// ROTA DE LOGIN (POST)
// ==========================
app.post('/login', (req, res) => {
  // Extrai o email e a senha digitados pelo usuário
  const { email, password } = req.body;

  // Procura o usuário na lista pelo email
  const user = users.find(u => u.email === email);

  if (user) {
    // Compara a senha digitada com a senha criptografada salva
    bcrypt.compare(password, user.senha, (err, isMatch) => {
      if (isMatch) {
        // Se a senha estiver correta, armazena o email do usuário na sessão
        req.session.userId = user.email;

        // Envia resposta de sucesso
        return res.status(200).json({ message: 'Login bem-sucedido' });
      }

      // Senha incorreta
      return res.status(401).json({ message: 'Credenciais inválidas' });
    });
  } else {
    // Usuário não encontrado
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }
});

// ==========================
// ROTA DO DASHBOARD (GET)
// ==========================
app.get('/dashboard', (req, res) => {
  // Verifica se há um usuário logado (sessão ativa)
  if (!req.session.userId) {
    return res.redirect('/login'); // Redireciona para login se não estiver logado
  }

  // Procura o usuário com base no email salvo na sessão
  const user = users.find(u => u.email === req.session.userId);

  if (user) {
    // Renderiza a página dashboard.ejs (OBS: deve ser 'dashboard', sem barra '/')
    return res.render('dashboard');
  } else {
    // Usuário não encontrado (mesmo com sessão ativa)
    return res.status(401).json({ message: 'Usuário não encontrado' });
  }
});

// ==========================
// ROTA PRINCIPAL "/"
// ==========================
app.get('/', (req, res) => {
  // Se estiver logado, redireciona para o dashboard
  if (req.session.userId) {
    return res.redirect('dashboard');
  } else {
    // Se não estiver logado, redireciona para a página de login
    return res.redirect('/login');
  }
});

// ==========================
// ROTA DE VERIFICAÇÃO DE SESSÃO
// ==========================
app.get('/verificar-sessao', (req, res) => {
  // Retorna true se o usuário estiver logado, senão false
  if (req.session.userId) {
    return res.status(200).json({ autenticado: true });
  }

  return res.status(200).json({ autenticado: false });
});

// ==========================
// INICIAR O SERVIDOR
// ==========================
app.listen(PORT, () => {
  // Mostra no terminal que o servidor está rodando
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
