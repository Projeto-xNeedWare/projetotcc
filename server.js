import express from "express";
import mysql from "mysql2/promise"; // promise para async/await
import session from "express-session";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

// Recriar __dirname em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(session({
  secret: "chave-secreta",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3600000 }
}));

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Conexão com MySQL
const db = await mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123@abc",
  database: "xneedware"
});

// ------------------ Cadastro ------------------
app.post("/cadastro", async (req, res) => {
  try {
    const { nome, sobrenome, email, senha } = req.body;

    // Verifica se email já existe
    const [rows] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);
    if (rows.length > 0) {
      return res.send("❌ Email já cadastrado!");
    }

    // Inserir no banco
    await db.query("INSERT INTO usuarios (nome, sobrenome, email, senha) VALUES (?, ?, ?, ?)", [nome, sobrenome, email, senha]);
    res.send("✅ Conta criada com sucesso! Agora faça login.");
  } catch (err) {
    console.error(err);
    res.send("❌ Erro ao cadastrar no servidor.");
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    const [rows] = await db.query(
      "SELECT * FROM usuarios WHERE email = ? AND senha = ?",
      [email, senha]
    );

    if (rows.length > 0) {
      // salva sessão
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

// ------------------ Logout ------------------
app.get("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) return res.send("❌ Erro ao sair!");
    res.redirect("/login");
  });
});

// Rota para pegar os dados do usuário logado
app.get("/api/usuario", (req, res) => {
  if (req.session.user) {
    res.json(req.session.user); // envia os dados da sessão
  } else {
    res.status(401).send("Não logado");
  }
});

// ------------------ Rotas ------------------

// Página inicial
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "pagina-inicial", "index.html"));
});

// Login
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login-cadastro", "index.html"));
});

// rota de conta do usuário
app.get("/conta", (req, res) => {
  if (!req.session.user) {
    // se não estiver logado, volta para login
    return res.redirect("/login");
  }
  res.sendFile(path.join(__dirname, "views", "conta-usuario", "minha-conta.html"));
});

// Demais rotas estáticas
app.get("/produtos", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "produtos", "index.html"));
});

app.get("/sobre", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "sobre", "index.html"));
});

app.get("/contato", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "pagina-inicial", "index.html#contato"));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
