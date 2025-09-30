const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// expõe public/ (CSS, JS, imagens)
app.use(express.static(path.join(__dirname, "public")));

//-------------------------------- ROTAS --------------------------------//

//----------------------------- PÁGINAS PRINCIPAIS --------------------------------//
// rota inicial
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "pagina-inicial", "index.html"));
});

// rota de login
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login-cadastro", "index.html"));
});

// rota de sair
app.get("/sair", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login-cadastro", "index.html"));
});

// rota de contato
app.get("/contato", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "pagina-inicial", "index.html#contato"));
});

// rota de produtos
app.get("/produtos", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "produtos", "index.html"));
});

// rota de sobre
app.get("/sobre", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "sobre", "index.html"));
});

// rota de conta do usuário
app.get("/conta", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "conta-usuario", "minha-conta.html"));
});

// rota de política de privacidade
app.get("/politica-privacidade", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "politica_privacidade", "index.html"));
});

// rota de pagamentos
app.get("/pagamentos", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "pagamentos", "index.html"));
});
//----------------------------- FIM PÁGINAS PRINCIPAIS --------------------------------//

//-------------------------------- PRODUTOS SEPARADOS ------------------------------------//
// chatbot
app.get("/chatbot", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "produtos", "produtos-separados", "chatbot.html"));
});

// downloader
app.get("/downloader", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "produtos", "produtos-separados", "downloader.html"));
});

// excel
app.get("/excel", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "produtos", "produtos-separados", "excel.html"));
});

// message
app.get("/message", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "produtos", "produtos-separados", "message.html"));
});

// qrcode
app.get("/qrgenerator", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "produtos", "produtos-separados", "qrcode.html"));
});

// manager
app.get("/manager", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "produtos", "produtos-separados", "manager.html"));
});
//-------------------------------- FIM PRODUTOS SEPARADOS --------------------------------//


//-------------------------------- FIM ROTAS --------------------------------//

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
