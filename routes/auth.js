const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const conn = require("../db/conn");

// Cadastro
router.post("/cadastro", (req, res) => {
  const { nome, email, senha } = req.body;

  // Criptografar senha
  const hash = bcrypt.hashSync(senha, 10);

  const sql = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";
  conn.query(sql, [nome, email, hash], (err, result) => {
    if (err) return res.status(500).json({ erro: err });
    res.json({ msg: "Usuário cadastrado com sucesso!" });
  });
});

// Login
router.post("/login", (req, res) => {
  const { email, senha } = req.body;

  const sql = "SELECT * FROM usuarios WHERE email = ?";
  conn.query(sql, [email], (err, results) => {
    if (err) return res.status(500).json({ erro: err });

    if (results.length === 0) {
      return res.status(401).json({ msg: "Usuário não encontrado!" });
    }

    const usuario = results[0];
    const senhaCorreta = bcrypt.compareSync(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ msg: "Senha incorreta!" });
    }

    res.json({ msg: "Login realizado com sucesso!", usuario: { nome: usuario.nome, email: usuario.email } });
  });
});

module.exports = router;
