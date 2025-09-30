import express from "express";
import mysql from "mysql2/promise";
import session from "express-session";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// ==================== CONFIGURAÇÃO INICIAL ====================
const app = express();
const PORT = process.env.PORT || 3000;

// Configuração para usar __dirname com ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==================== MIDDLEWARES ====================
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cors()); // Habilitar CORS

// Configuração de sessão
app.use(session({
  secret: "chave-secreta",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3600000 } // 1 hora
}));

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, "public")));

// ==================== CONEXÃO COM BANCO DE DADOS ====================
const db = await mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123@abc",
  database: "xneedware"
});

// ==================== ROTAS DE AUTENTICAÇÃO ====================

// Rota de cadastro de usuário
app.post("/cadastro", async (req, res) => {
  try {
    const { nome, sobrenome, email, senha } = req.body;

    // Verifica se email já existe no banco
    const [rows] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);
    if (rows.length > 0) {
      return res.send("❌ Email já cadastrado!");
    }

    // Insere novo usuário no banco
    await db.query(
      "INSERT INTO usuarios (nome, sobrenome, email, senha) VALUES (?, ?, ?, ?)", 
      [nome, sobrenome, email, senha]
    );
    res.send("✅ Conta criada com sucesso! Agora faça login.");
  } catch (err) {
    console.error(err);
    res.send("❌ Erro ao cadastrar no servidor.");
  }
});

// Rota de login
app.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Verifica credenciais no banco
    const [rows] = await db.query(
      "SELECT * FROM usuarios WHERE email = ? AND senha = ?",
      [email, senha]
    );

    if (rows.length > 0) {
      // Salva dados do usuário na sessão
      req.session.user = {
        id: rows[0].id,
        nome: rows[0].nome,
        sobrenome: rows[0].sobrenome,
        email: rows[0].email
      };
      res.send(`✅ Bem-vindo, ${rows[0].nome}!`);
    } else {
      res.send("❌ Email ou senha inválidos.");
    }
  } catch (err) {
    console.error(err);
    res.send("❌ Erro ao conectar ao servidor.");
  }
});

// ==================== ROTAS DE SESSÃO ====================

// Rota de logout
app.get("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) return res.send("❌ Erro ao sair!");
    res.redirect("/login");
  });
});

// Rota para obter dados do usuário logado
app.get("/api/usuario", (req, res) => {
  if (req.session.user) {
    res.json(req.session.user); // Retorna dados da sessão
  } else {
    res.status(401).send("Não logado");
  }
});

// ==================== ROTAS DE PÁGINAS ====================

// Página inicial
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "pagina-inicial", "index.html"));
});

// Página de login/cadastro
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login-cadastro", "index.html"));
});

// Página da conta do usuário (protegida)
app.get("/conta", (req, res) => {
  if (!req.session.user) {
    // Redireciona para login se não estiver autenticado
    return res.redirect("/login");
  }
  res.sendFile(path.join(__dirname, "views", "conta-usuario", "minha-conta.html"));
});

// Página de produtos
app.get("/produtos", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "produtos", "index.html"));
});

// Página sobre
app.get("/sobre", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "sobre", "index.html"));
});

// Página de contato
app.get("/contato", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "pagina-inicial", "index.html#contato"));
});

// Página de pagamento
app.get("/pagamentos", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "pagamentos", "index.html"));
});

// Página de carrinho
app.get("/carrinho", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "carrinho", "index.html"));
});

// ==================== ROTAS DE PÁGINAS (PRODUTOS) ====================

// Página do xNeed Downloader
app.get("/downloader", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "produtos", "produtos-separados", "downloader.html"));
});

// Página do xNeed Chatbot
app.get("/chatbot", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "produtos", "produtos-separados", "chatbot.html"));
});

// Página do xNeed Excel
app.get("/excel", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "produtos", "produtos-separados", "excel.html"));
});

// Página do xNeed Manager
app.get("/manager", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "produtos", "produtos-separados", "manager.html"));
});

// Página do xNeed Message
app.get("/message", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "produtos", "produtos-separados", "message.html"));
});

// Página do xNeed QrGenerator
app.get("/qrgenerator", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "produtos", "produtos-separados", "qrgenerator.html"));
});


// ==================== INICIALIZAÇÃO DO SERVIDOR ====================
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});