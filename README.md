# 🚀 xNeedWare - Plataforma de Venda de Softwares e Serviços (Protótipo TCC)

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

## 🎯 Objetivo do Projeto

O **xNeedWare** é um protótipo funcional desenvolvido como Trabalho de Conclusão de Curso (TCC) com o objetivo de criar uma plataforma *online* para **solicitação e comercialização de softwares do tipo SaaS (Software as a Service)**.

O sistema visa facilitar a comunicação entre desenvolvedores e micro/pequenas empresas, oferecendo uma interface simples para:
1.  Visualizar serviços e soluções de software disponíveis.
2.  Solicitar o desenvolvimento de sistemas personalizados.

Este projeto serve como um protótipo inicial de um sistema de vendas automatizado, demonstrando o processo completo de desenvolvimento de software, desde a concepção até a implementação.

## ✨ Funcionalidades Principais

*   **Interface Responsiva:** Prioriza a clareza visual e a eficiência em diferentes dispositivos.
*   **Gestão de Usuários:** Fluxo de cadastro e login com armazenamento seguro de informações.
*   **Simulação de Compra:** Estrutura para gerenciamento de produtos e simulação de compra de softwares.
*   **Integração de Pagamento (Teste):** Utilização da API do Google Pay em ambiente de teste para simular transações.
*   **Arquitetura MVC:** Estrutura modular para facilitar a manutenção e a escalabilidade.

## 🛠️ Stack Tecnológica

O projeto foi desenvolvido utilizando uma *stack* moderna e consolidada:

| Categoria | Tecnologia | Detalhes |
| :--- | :--- | :--- |
| **Linguagem** | JavaScript | Utilizada como *full stack* (Front-end e Back-end). |
| **Back-end** | Node.js com Express | Ambiente de execução e *framework* para rotas REST e lógica do servidor. |
| **Front-end** | HTML5, CSS3, JavaScript | Interface de usuário com foco em usabilidade e design *Tech*. |
| **Banco de Dados** | MySQL Workbench | Banco de dados relacional para armazenamento de usuários, solicitações e produtos. |
| **Pagamento** | Google Pay API | Integração em ambiente de teste para simulação de transações. |
| **Controle de Versão** | Git / GitHub | Gerenciamento de código e colaboração. |

## 🏗️ Arquitetura da Solução

A arquitetura segue o padrão **Model-View-Controller (MVC)**, garantindo a separação de responsabilidades:

*   **Model:** Gerencia a lógica de negócio e a interação com o banco de dados MySQL.
*   **View:** Responsável pela interface do usuário (páginas HTML e scripts JS em `views/`).
*   **Controller:** Intermediário (principalmente em `server.js`), define rotas, processa requisições e aciona o Model.

## ⚙️ Instalação e Execução

Siga os passos abaixo para configurar e executar o projeto em seu ambiente local.

### Pré-requisitos

Certifique-se de ter instalado em sua máquina:

*   [Node.js](https://nodejs.org/en/) (versão LTS recomendada)
*   [MySQL Workbench](https://www.mysql.com/products/workbench/) ou outro cliente MySQL

### 1. Acesso ao Código-Fonte

O código-fonte está disponível no seguinte repositório:

```bash
git clone https://github.com/Projeto-xNeedWare/projetotcc.git
cd projetotcc
```

### 2. Instalação das Dependências

Utilize o NPM para instalar todas as bibliotecas necessárias para o *back-end*:

```bash
npm install
```

### 3. Configuração do Banco de Dados

1.  Crie um banco de dados local com o nome `xneedware` (ou outro de sua preferência).
2.  No arquivo `server.js` configure as credenciais de acesso ao seu MySQL:

    ```ini
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=sua_senha_mysql
    DB_NAME=xneedware
    ```

3.  Execute o script SQL de criação da tabela de usuários:

    ```sql
    CREATE TABLE usuarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR (50) NOT NULL,
        sobrenome VARCHAR (50) NOT NULL,
        email VARCHAR (100) NOT NULL UNIQUE,
        senha VARCHAR (255) NOT NULL,
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ```

### 4. Execução do Servidor

Inicie o servidor Node.js com o comando:

```bash
node server.js
```

O sistema estará acessível localmente em:

🔗 **[http://localhost:3000](http://localhost:3000)**

## 🔮 Futuras Implementações

O projeto está preparado para as seguintes evoluções:

*   **Integração Real de Pagamento:** Substituição do ambiente de testes por *gateways* de pagamento reais.
*   **Painel Administrativo:** Implementação de um painel para gestão de solicitações e métricas de uso.
*   **Deploy Contínuo:** Configuração de CI/CD para hospedagem em ambientes de nuvem (AWS, Render, etc.).
*   **Expansão de Funcionalidades:** Adição de mais produtos e funcionalidades para uso direto no site.

## 👥 Equipe

| Nome | Função |
| :--- | :--- |
| Gabriel Diogo Marin Loquetti | Desenvolvedor |
| Felipe Lotério dos Santos | Desenvolvedor |
| Matheus de Mello de Carvalho | Desenvolvedor |
| Bruno Correr Coa | Desenvolvedor |

**Orientador(a):** Profª. Cláudia Heleno

---

*Este README.md foi gerado com base na Documentação Técnica do Software TCC (10/11/2025).*
*Repositório Oficial: [https://github.com/Projeto-xNeedWare/projetotcc](https://github.com/Projeto-xNeedWare/projetotcc)*
