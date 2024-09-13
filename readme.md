# 📦 AppAreceu

**Visão Geral:**

“AppAreceu” é um sistema desenvolvido para auxílio e melhor visualização de itens encontrados e perdidos no IFRN - Campus Currais Novos. O sistema possui dois módulos principais: um para alunos informarem itens perdidos, e outro para administradores cadastrarem os itens encontrados. Utiliza **Express.js** para o back-end, **React** (template Vite) para o front-end, e o banco de dados **MySQL** para o armazenamento dos dados.

---

## 📑 Sumário
- [📂 AppAreceu_Frontend](#frontend)
  - [🔌 apis/](#-apis)
  - [📄 eslint.config.js](#-eslintconfigjs)
  - [🌐 index.html](#-indexhtml)
  - [📦 package.json](#-packagejson)
  - [🗂 public/](#-public)
  - [📁 src/](#-src)
  - [⚙️ vite.config.js](#️-viteconfigjs)
- [📂 AppAreceu_Backend](#backend)
  - [🚀 app.js](#-appjs)
  - [🔧 bin/](#-bin)
  - [🗃 db.js](#-dbjs)
  - [🗂 models/](#-models)
  - [📦 package.json](#-packagejson-1)
  - [🗂 public/](#-public-1)
  - [🛣 routes/](#-routes)
  - [👁 views/](#-views)

---

## 📂 Frontend

Este diretório contém o código front-end da aplicação, construído em React utilizando o template Vite.

### 🔌 apis/
- **cliente_suap/**: Diretório para chamadas à API do SUAP (Sistema Unificado de Administração Pública).
  - **client.js**: Arquivo que gerencia as requisições à API do SUAP.
  - **js.cookie.js**: Biblioteca utilizada para o gerenciamento de cookies.
  - **README.md**: Documentação explicativa sobre a integração com a API do SUAP.

### 📄 eslint.config.js
- Configurações para o ESLint, utilizado para garantir a qualidade e a padronização do código.

### 🌐 index.html
- Arquivo HTML principal do front-end, onde a aplicação React é carregada.

### 📦 package.json
- Lista as dependências e scripts do projeto front-end.

### 🗂 public/
- Arquivos estáticos utilizados no front-end.
  - **vite.svg**: Logo padrão do Vite.

### 📁 src/
- Código-fonte principal da aplicação React.
  - **App.css**: Arquivo de estilos específicos da aplicação.
  - **App.jsx**: Componente principal do front-end React.
  - **assets/**: Diretório para imagens e outros recursos estáticos.
    - **react.svg**: Logo do React usada no projeto.
  - **context/**: Arquivos que gerenciam o estado global da aplicação usando Context API.
    - **SuapContext.jsx**: Arquivo responsável por criar e gerenciar o contexto da API do SUAP.
  - **index.css**: Arquivo CSS global da aplicação.
  - **main.jsx**: Ponto de entrada da aplicação React, onde os componentes são renderizados.
  - **pages/**: Páginas principais da aplicação.
    - **Inicio.jsx**: Página inicial do sistema, onde os usuários podem interagir com a aplicação.

### ⚙️ vite.config.js
- Configurações específicas do Vite, como comportamento de build e servidor.

---

## 📂 Backend

Este diretório contém o código do servidor back-end, construído com Express.js.

### 🚀 app.js
- Arquivo principal que inicializa o servidor Express e define as rotas e middleware.

### 🔧 bin/
- Contém scripts de inicialização.
  - **www**: Script que inicializa o servidor, especificando a porta de execução.

### 🗃 db.js
- Configuração de conexão com o banco de dados MySQL.

### 🗂 models/
- Diretório para os modelos do banco de dados.
  - **Users.js**: Modelo de usuários, utilizado para armazenar informações dos usuários no banco de dados.

### 📦 package.json
- Lista as dependências e scripts do projeto back-end.

### 🗂 public/
- Diretório para arquivos públicos do back-end, como imagens e arquivos CSS.
  - **images/**: Imagens que serão utilizadas no sistema.
  - **javascripts/**: Scripts JavaScript públicos do sistema.
  - **stylesheets/**: Arquivos CSS públicos.
    - **style.css**: Estilos globais para as páginas renderizadas pelo Express.

### 🛣 routes/
- Contém as rotas do sistema.
  - **index.js**: Rotas principais do sistema.
  - **users.js**: Rotas relacionadas a usuários.

### 👁 views/
- Diretório para as views renderizadas no servidor Express, utilizando EJS como motor de template.
  - **error.ejs**: Página de erro padrão.
  - **index.ejs**: Página inicial renderizada pelo back-end.

---