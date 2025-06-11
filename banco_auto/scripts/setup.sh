#!/bin/bash

# Script para configurar e executar o site da documentação

echo "🚀 Configurando site da documentação..."

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Instale Node.js primeiro:"
    echo "   https://nodejs.org/"
    exit 1
fi

# Verificar se npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm não encontrado. Instale npm primeiro."
    exit 1
fi

echo "✅ Node.js e npm encontrados"

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

# Executar em modo desenvolvimento
echo "🌐 Iniciando servidor de desenvolvimento..."
echo "📍 O site estará disponível em: http://localhost:3000"
echo "🔄 Para parar o servidor, pressione Ctrl+C"

npm run dev
