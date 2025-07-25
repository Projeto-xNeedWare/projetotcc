# 🧠 xNeedWare — Sistema de Gestão de Solicitação de Softwares

Sistema de gerenciamento de pedidos de desenvolvimento de softwares personalizados, voltado para atender empresas e indivíduos que desejam soluções sob medida. Este projeto foi desenvolvido como Trabalho de Conclusão de Curso (TCC) para o curso Técnico em Desenvolvimento de Sistemas.

---

## 🚀 Funcionalidades Principais

- Cadastro e login de usuários
- Formulário de solicitação de software
- Página de gerenciamento de conta
- Painel de controle com dashboard
- API de envio de dados via PHP (PHPMailer)
- Integração com banco de dados MySQL
- Compatível com migração MongoDB → MySQL
- Envio de e-mails automatizados
- Validação e animações frontend com JavaScript

---

## 📁 Estrutura de Pastas

```bash
├── banco_auto/                   # Scripts SQL de criação de banco
├── migracao-mysql/              # Scripts de migração MySQL
├── migracao-mongodb-mysql.js    # Script de migração Mongo → MySQL
├── models/                      # Modelos JS (ex: usuario.js)
├── public/                      # Arquivos JS e CSS públicos
│   ├── animation-scroll.js
│   ├── dashboard.js
│   ├── formulario-cadastro.js
│   ├── formulario-login.js
│   ├── styles.css
├── views/                       # Páginas HTML/PHP organizadas
│   ├── login/
│   ├── cadastro/
│   ├── conta-usuario/
│   ├── produtos/
│   └── ...
├── PHPMailer/                   # Biblioteca de envio de e-mail
├── enviar.php                   # Manipulação do formulário
├── autoload.php                 # Autoloader Composer
├── .env                         # Variáveis de ambiente
├── composer.json
└── README.md                    # ← Você está aqui!

🧰 Tecnologias Utilizadas
Frontend: HTML5, CSS3, JavaScript

Backend: PHP (com PHPMailer)

Banco de Dados: MySQL (com opção de migração MongoDB)

Gerenciador de Dependências: Composer

Hospedagem sugerida: Hostinger

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
Matheus Mello
Felipe Lotério
Bruno Correr

TCC — Técnico em Desenvolvimento de Sistemas
LinkedIn • GitHub