# Sistema de Gestão de Veículos Ford

Sistema completo para gestão de veículos, manutenções, peças e serviços da Ford.

## 🚀 Tecnologias

- Frontend: Angular 17
- Backend: Node.js com Express
- Banco de Dados: MongoDB
- Autenticação: JWT

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- MongoDB
- Angular CLI

## 🔧 Instalação

1. Clone o repositório
```bash
git clone https://github.com/SEU-USUARIO/ford-vehicle-management.git
cd ford-vehicle-management
```

2. Instale as dependências do frontend
```bash
npm install
```

3. Instale as dependências do backend
```bash
cd api-angular-ford
npm install
```

4. Configure as variáveis de ambiente
- Crie um arquivo `.env` na pasta `api-angular-ford` com as seguintes variáveis:
```
PORT=3001
MONGODB_URI=sua_url_do_mongodb
JWT_SECRET=seu_segredo_jwt
```

## 🚀 Executando o projeto

1. Inicie o backend
```bash
cd api-angular-ford
npm start
```

2. Em outro terminal, inicie o frontend
```bash
ng serve
```

3. Acesse o sistema em `http://localhost:4200`

## 📦 Funcionalidades

- Autenticação de usuários
- Gestão de veículos
- Gestão de manutenções
- Gestão de peças
- Gestão de serviços
- Gestão de fornecedores
- Gestão de ordens de serviço
- Relatórios e análises

## 👥 Usuários de Teste

- Admin
  - Usuário: admin
  - Senha: 123456

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
