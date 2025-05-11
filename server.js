const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const Usuario = require('./models/usuario');
const session = require('express-session');

const app = express();

// Conexão com o MongoDB
mongoose.connect('mongodb+srv://xNeedDatabase:xNeed768@xneed-database.pxzkxo5.mongodb.net/xNeedDB?retryWrites=true&w=majority&appName=xNeed-Database', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB conectado!'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Middleware para processar o corpo da requisição como JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurando a sessão
app.use(session({
    secret: 'secret-key',  // Chave secreta para assinatura da sessão
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Em produção, use true e configure HTTPS
}));

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'views')));

// Rotas GET
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/pagina_inicial/index.html'));
});

app.get('/login', (req, res) => {
    if (req.session.usuario) {
        return res.redirect('/dashboard');  // Redireciona se o usuário estiver logado
    }
    res.sendFile(path.join(__dirname, 'views/login/index.html'));
});

app.get('/cadastro', (req, res) => {
    if (req.session.usuario) {
        return res.redirect('/conta-usuario');  // Redireciona para o dashboard caso já esteja logado
    }
    res.sendFile(path.join(__dirname, 'views/cadastro/index.html'));
});

// Rota GET: Dashboard (pagina do usuário logado)
app.get('/dashboard', (req, res) => {
    if (!req.session.usuario) {
        return res.redirect('/login');  // Se não estiver logado, redireciona para login
    }
    res.sendFile(path.join(__dirname, 'views/conta-usuario/index.html'));  // Página do dashboard
});

// Rota POST: Cadastro
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

// Rota POST: Login
app.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
        return res.status(400).json({ erro: 'Usuário não encontrado' });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
        return res.status(400).json({ erro: 'Senha incorreta' });
    }

    // Iniciando a sessão do usuário
    req.session.usuario = {
        id: usuario._id,
        nome: usuario.nome,
        sobrenome: usuario.sobrenome,
        email: usuario.email
    };

    res.status(200).json({ sucesso: 'Login realizado com sucesso!' });
});

// Rota GET: Verificar quem está logado
app.get('/usuario-logado', (req, res) => {
    if (!req.session.usuario) {
        return res.status(401).json({ erro: 'Usuário não autenticado' });
    }

    // Retorna os dados do usuário logado
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

// Rota POST: Atualizar Dados Pessoais do Usuário
app.post('/atualizar-dados', async (req, res) => {
    if (!req.session.usuario) {
        return res.status(401).json({ erro: 'Usuário não autenticado' });
    }

    const { nome, email, telefone, cpf, endereco, cidade, estado, cep } = req.body;

    try {
        // Atualiza os dados do usuário logado
        const usuarioAtualizado = await Usuario.findByIdAndUpdate(
            req.session.usuario.id,
            { nome, email, telefone, cpf, endereco, cidade, estado, cep },
            { new: true }
        );

        // Atualiza a sessão com os novos dados
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

// Porta
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
