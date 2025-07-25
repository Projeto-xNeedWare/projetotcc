const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '../views')));

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login/index.html'));
});

app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/cadastro/index.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/pagina_inicial/index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
