# 🧠 xNeedWare — Sistema de Gestão de Solicitação de Softwares

Sistema de gerenciamento de pedidos de desenvolvimento de softwares personalizados, voltado para atender empresas e indivíduos que desejam soluções sob medida. Este projeto foi desenvolvido como Trabalho de Conclusão de Curso (TCC) para o curso Técnico em Desenvolvimento de Sistemas.

## 🚀 Funcionalidades Principais

- Cadastro e login de usuários
- Formulário de solicitação de software
- Página de gerenciamento de conta
- Integração com banco de dados MySQL
- Envio de e-mails automatizados
- Validação e animações frontend com JavaScript

## 📁 Estrutura de Pastas

```bash
├── db/         
│   └── conn.js
├── node_modules/
│   └── ...
├── public/
│   ├── assets/
│   ├── css/
│   ├── js/
│   └── favicon.ico
├── routes/
│   └── auth.js
├── views/
│   ├── conta-usuario/
│   ├── login-cadastro/
│   ├── pagamentos/
│   ├── pagina-inicial/
│   ├── politica-privacidade/
│   ├── produtos/
│   └── sobre/
├── package-lock.json
├── package.json
├── README.md
└── server.js

🧰 Tecnologias Utilizadas
Frontend: HTML5, CSS3, JavaScript

Backend: Node.js e JavaScript

Banco de Dados: MySQL Workbench

Gerenciador de Dependências: Composer

🤝 Contribuição
Contribuições são bem-vindas!
Sinta-se à vontade para abrir issues, enviar pull requests ou sugerir melhorias.

⚙️ Instalação Local
# 1. Clone o repositório
git clone https://github.com/Projeto-xNeedWare/projetotcc.git

# 2. Acesse a pasta do projeto
cd projetotcc

# 3. Instale dependências via Composer
composer install

# 4. Configure o arquivo .env
cp .env.example .env
# Edite as variáveis de conexão com o banco e SMTP

# 5. Importe o banco de dados
# Utilize os arquivos em banco_auto/ no phpMyAdmin

# 6. Inicie o servidor local (exemplo com PHP embutido)
php -S localhost:8000 -t public

👨‍💻 Desenvolvido por
Gabriel Marin
Matheus de Mello
Felipe Lotério
Bruno Correr

TCC — Técnico em Desenvolvimento de Sistemas
LinkedIn • GitHub