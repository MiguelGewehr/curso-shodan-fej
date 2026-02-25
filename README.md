# PI2 - Sistema de Gestão Curso para Shodan Judô

Um sistema completo de gestão para curso para Shodan, desenvolvido como projeto de Programação II (PI2). O sistema permite o gerenciamento de módulos de treinamento, controle de pagamentos, presença de alunos e administração de usuários, com autenticação baseada em papéis (alunos e administradores).

## 📋 Funcionalidades

### Para Alunos
- **Visualização de Módulos**: Acesso aos módulos de judô com informações sobre instrutores, conteúdos complementares (vídeos e documentos).
- **Upload de Comprovantes de Pagamento**: Envio de boletos ou comprovantes de pagamento para aprovação.
- **Interface Intuitiva**: Navegação simples e responsiva para dispositivos móveis e desktop.

### Para Administradores
- **Dashboard Administrativo**: Visão geral do sistema com estatísticas e navegação rápida.
- **Gerenciamento de Pagamentos**: Aprovação/rejeição de comprovantes de pagamento enviados pelos alunos.
- **Controle de Presença**: Registro e monitoramento da presença dos alunos nos módulos.
- **Gerenciamento de Usuários**: Adição de novos alunos e administradores ao sistema.

## 🛠️ Tecnologias Utilizadas

- **Frontend**:
  - React 19 com TypeScript
  - Vite (bundler e dev server)
  - React Router DOM (roteamento)
  - React Icons (ícones)
  - Swiper (carrosséis)

- **Backend e Banco de Dados**:
  - Firebase:
    - Authentication (autenticação)
    - Firestore (banco de dados NoSQL)
    - Cloud Storage (armazenamento de arquivos)
    - Cloud Functions (funções serverless)

- **Estilização**:
  - CSS Modules
  - Design responsivo

- **Ferramentas de Desenvolvimento**:
  - ESLint (linting)
  - TypeScript (tipagem estática)

## 🚀 Instalação e Configuração

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Conta no Firebase

### Passos de Instalação

1. **Clone o repositório**:
   ```bash
   git clone <url-do-repositorio>
   cd PI2-Shodan
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure o Firebase**:

   a. Crie um projeto no [Firebase Console](https://console.firebase.google.com/)

   b. Ative os serviços:
      - Authentication
      - Firestore Database
      - Storage
      - Functions

   c. Configure as regras de segurança no Firestore e Storage

   d. Crie um arquivo `.env` na raiz do projeto com as variáveis de ambiente:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```
4. **Execute o projeto**:
   ```bash
   npm run dev
   ```

O aplicativo estará disponível em `http://localhost:5173`

## 🤝 Contribuição

Este é um projeto acadêmico desenvolvido como parte do curso de Programação II. Para sugestões ou melhorias, entre em contato com os desenvolvedores.

## 📄 Licença

Este projeto é de uso acadêmico e não possui licença específica para distribuição comercial.