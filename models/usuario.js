const mongoose = require('mongoose');

// Definindo o esquema do usuário
const usuarioSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    telefone: { type: String },
    cpf: { type: String },
    endereco: { type: String },
    cidade: { type: String },
    estado: { type: String },
    cep: { type: String }
});

// Criando o modelo de usuário
module.exports = mongoose.model('Usuario', usuarioSchema);
