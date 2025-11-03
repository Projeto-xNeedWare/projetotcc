## 🧠 xNeedWare — Sistema de Gestão de Solicitação de Softwares

[![GitHub license](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Tecnologias](https://img.shields.io/badge/Tecnologias-Node.js%2C%20MySQL-green.svg)](https://github.com/Projeto-xNeedWare/projetotcc)

O **xNeedWare** é um sistema de gerenciamento de pedidos de desenvolvimento de softwares personalizados. Ele foi projetado para atender empresas e indivíduos que buscam soluções tecnológicas sob medida, simplificando o processo de solicitação e gestão de projetos de software.

Este projeto foi desenvolvido como **Trabalho de Conclusão de Curso (TCC)** para o curso Técnico em Desenvolvimento de Sistemas na escola Doutor Jorge Coury.

---

### ✨ Funcionalidades

O sistema oferece um conjunto robusto de recursos para uma gestão completa de solicitações:

* **Autenticação Segura:** Cadastro e login de usuários com criptografia.
* **Solicitação de Software:** Formulário intuitivo para detalhamento de novos pedidos.
* **Compra de mini-softwares:** Página de produtos onde a pessoa consegue comprar mini-softwares feitos por nós no primeiro ano do curso.
* **Comunicação Automatizada:** Envio de e-mails após a compra do produto.
* **Interação Dinâmica:** Validações de *frontend* e animações utilizando JavaScript puro.
* **Pagamento 100% seguro com API Google Pay:** Pela segurança do usuário ele pode reaizar uma compra pelo método Google Pay.
* **Estrutura de Dados Sólida:** Integração com banco de dados **MySQL**.

### 💻 Tecnologias Utilizadas

| Categoria | Tecnologia | Descrição |
| :--- | :--- | :--- |
| **Backend** | Node.js | Ambiente de execução para o servidor. |
| **Linguagem** | JavaScript | Utilizada principalmente no *backend*. |
| **Banco de Dados** | MySQL Workbench | Sistema de gerenciamento de banco de dados relacional. |
| **Frontend** | HTML5, CSS3 | Estrutura e estilização da interface. |

---

### 📂 Estrutura de Pastas e Arquivos Chave

A arquitetura do projeto segue um padrão MVC (Model-View-Controller) simplificado, comum em aplicações Node.js:

| Pasta/Arquivo | Propósito |
| :--- | :--- |
| `server.js` | **Ponto de Entrada** que inicializa o servidor. |
| `db/` | Contém o módulo de conexão com o MySQL (`conn.js`). |
| `routes/` | Define os *endpoints* da aplicação (e.g., `auth.js` para login/cadastro). |
| **`public/`** | Armazena todos os ativos estáticos (CSS, JS de *frontend*, Imagens). |
| **`views/`** | Contém os arquivos de *template* (HTML/EJS/etc.) que o servidor renderiza. |

#### 💡 Explicação de `public/` e `views/`

* **`public/` (Conteúdo Estático)**: Esta pasta é servida "como está" ao navegador do usuário. Arquivos dentro dela (como CSS, scripts de frontend e imagens) são acessíveis diretamente pela URL do projeto, sem processamento do servidor.
* **`views/` (Templates Dinâmicos)**: Esta pasta **não é** acessível diretamente. Ela armazena os *templates* que o Node.js utiliza para montar as páginas HTML dinamicamente (injetando dados do banco, por exemplo) antes de enviá-las ao cliente.

---

### 🚀 Instalação e Uso (Node.js)

Para iniciar o **xNeedWare** em seu ambiente de desenvolvimento, siga os passos abaixo.

#### Pré-requisitos

* **Node.js** (LTS recomendado) e **npm**.
* **MySQL Workbench** ou ambiente MySQL configurado.

#### 1. Configuração do Projeto

```bash
# 1. Clone o repositório
git clone [https://github.com/Projeto-xNeedWare/projetotcc.git](https://github.com/Projeto-xNeedWare/projetotcc.git)

# 2. Acesse o diretório do projeto
cd projetotcc

# 3. Instale as dependências Node.js
npm install

Perfeito! O README anterior já está formatado em Markdown.

Aqui está o código completo do README atualizado, profissional e limpo, incluindo as explicações sobre Node.js e as pastas public/views, pronto para ser copiado e colado no seu arquivo README.md:

Markdown

## 🧠 xNeedWare — Sistema de Gestão de Solicitação de Softwares

[![GitHub license](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Tecnologias](https://img.shields.io/badge/Tecnologias-Node.js%2C%20MySQL-green.svg)](https://github.com/Projeto-xNeedWare/projetotcc)

O **xNeedWare** é um sistema de gerenciamento de pedidos de desenvolvimento de softwares personalizados. Ele foi projetado para atender empresas e indivíduos que buscam soluções tecnológicas sob medida, simplificando o processo de solicitação e gestão de projetos de software.

Este projeto foi desenvolvido como **Trabalho de Conclusão de Curso (TCC)** para o curso Técnico em Desenvolvimento de Sistemas.

---

### ✨ Funcionalidades

O sistema oferece um conjunto robusto de recursos para uma gestão completa de solicitações:

* **Autenticação Segura:** Cadastro e login de usuários com validação.
* **Solicitação de Software:** Formulário intuitivo para detalhamento de novos pedidos.
* **Gestão de Conta:** Página dedicada para o usuário acompanhar o status de suas solicitações.
* **Comunicação Automatizada:** Envio de e-mails transacionais (via SMTP) para notificações importantes.
* **Interação Dinâmica:** Validações de *frontend* e animações utilizando JavaScript puro.
* **Estrutura de Dados Sólida:** Integração com banco de dados **MySQL**.

### 💻 Tecnologias Utilizadas

| Categoria | Tecnologia | Descrição |
| :--- | :--- | :--- |
| **Backend** | Node.js | Ambiente de execução para o servidor. |
| **Linguagem** | JavaScript | Utilizada tanto no *backend* quanto no *frontend*. |
| **Banco de Dados** | MySQL Workbench | Sistema de gerenciamento de banco de dados relacional. |
| **Frontend** | HTML5, CSS3 | Estrutura e estilização da interface. |
| **Dependências** | npm/Yarn | Gerenciamento de pacotes e dependências. |

---

### 📂 Estrutura de Pastas e Arquivos Chave

A arquitetura do projeto segue um padrão MVC (Model-View-Controller) simplificado, comum em aplicações Node.js:

| Pasta/Arquivo | Propósito |
| :--- | :--- |
| `server.js` | **Ponto de Entrada** que inicializa o servidor. |
| `db/` | Contém o módulo de conexão com o MySQL (`conn.js`). |
| `routes/` | Define os *endpoints* da aplicação (e.g., `auth.js` para login/cadastro). |
| **`public/`** | Armazena todos os ativos estáticos (CSS, JS de *frontend*, Imagens). |
| **`views/`** | Contém os arquivos de *template* (HTML/EJS/etc.) que o servidor renderiza. |

#### 💡 Explicação de `public/` e `views/`

* **`public/` (Conteúdo Estático)**: Esta pasta é servida "como está" ao navegador do usuário. Arquivos dentro dela (como CSS, scripts de frontend e imagens) são acessíveis diretamente pela URL do projeto, sem processamento do servidor.
* **`views/` (Templates Dinâmicos)**: Esta pasta **não é** acessível diretamente. Ela armazena os *templates* que o Node.js utiliza para montar as páginas HTML dinamicamente (injetando dados do banco, por exemplo) antes de enviá-las ao cliente.

---

### 🚀 Instalação e Uso (Node.js)

Para iniciar o **xNeedWare** em seu ambiente de desenvolvimento, siga os passos abaixo.

#### Pré-requisitos

* **Node.js** (LTS recomendado) e **npm**.
* **MySQL Workbench** ou ambiente MySQL configurado.

#### 1. Configuração do Projeto

```bash
# 1. Clone o repositório
git clone [https://github.com/Projeto-xNeedWare/projetotcc.git](https://github.com/Projeto-xNeedWare/projetotcc.git)

# 2. Acesse o diretório do projeto
cd projetotcc

# 3. Instale as dependências Node.js
npm install

2. Configuração do Banco de Dados e Ambiente
Crie um banco de dados MySQL.

Importe as tabelas utilizando os arquivos de dump (mencionados como banco_auto/ no seu antigo README).

Configure as variáveis de ambiente:

# 4. Crie o arquivo de variáveis de ambiente
cp .env.example .env

# 5. Edite o arquivo .env
# Configure as variáveis de conexão com o MySQL (host, user, password, database)
# e as credenciais de SMTP para o envio de e-mails.

# 6. Inicie o servidor Node.js
npm start
# OU, se houver um script de desenvolvimento (ex: com nodemon):
# npm run dev

O servidor estará rodando no endereço configurado (geralmente http://localhost:3000).

🤝 Contribuição
Contribuições são a espinha dorsal de um projeto de código aberto! Sinta-se à vontade para abrir issues ou enviar pull requests.

👨‍💻 Desenvolvedores
Este projeto é um esforço colaborativo do TCC, desenvolvido por:

Gabriel Marin

Matheus de Mello

Felipe Lotério

Bruno Correr

Trabalho de Conclusão de Curso (TCC) — Técnico em Desenvolvimento de Sistemas.
