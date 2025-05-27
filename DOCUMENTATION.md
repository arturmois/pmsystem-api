# Sistema de Gerenciamento de Projetos (PMSystem)

## Visão Geral
O PMSystem é uma API RESTful desenvolvida para gerenciar projetos, orçamentos e interações entre empresas, profissionais e gerentes no contexto de projetos de design e arquitetura.

## Arquitetura

### Padrão de Arquitetura
O sistema segue uma arquitetura em camadas (Layered Architecture) com os seguintes componentes:

1. **Controllers**: Responsáveis por receber as requisições HTTP e coordenar o fluxo de dados
2. **Services**: Contêm a lógica de negócios
3. **Repositories**: Gerenciam o acesso aos dados
4. **Models**: Definem a estrutura dos dados
5. **Routes**: Definem os endpoints da API
6. **Middlewares**: Implementam funcionalidades transversais (autenticação, validação, etc.)

### Estrutura de Diretórios
```
src/
├── controllers/    # Controladores da aplicação
├── services/       # Lógica de negócios
├── repositories/   # Acesso aos dados
├── models/         # Modelos de dados
├── routes/         # Definição de rotas
├── middlewares/    # Middlewares da aplicação
├── config/         # Configurações
├── shared/         # Código compartilhado
├── errors/         # Tratamento de erros
└── @types/         # Definições de tipos TypeScript
```

## Tecnologias Utilizadas

### Backend
- **Node.js**: Runtime JavaScript
- **TypeScript**: Linguagem de programação
- **Express**: Framework web
- **Prisma**: ORM para acesso ao banco de dados
- **PostgreSQL**: Banco de dados relacional
- **JWT**: Autenticação via tokens
- **Zod**: Validação de dados
- **Jest**: Framework de testes

### Ferramentas de Desenvolvimento
- **ESLint**: Linting de código
- **Nodemon**: Hot-reload em desenvolvimento
- **Docker**: Containerização
- **Git**: Controle de versão

## Modelo de Dados

### Entidades Principais

1. **User**
   - Representa usuários do sistema
   - Tipos: Empresa (E), Profissional (P), Gerente (G)
   - Campos: email, senha, data de nascimento, role

2. **Company**
   - Representa empresas parceiras
   - Campos: CNPJ, endereço, nome fantasia, razão social, segmento
   - Relacionamentos: User (1:1), Budgets (1:N), Sales (1:N)

3. **Professional**
   - Representa profissionais (designers, arquitetos)
   - Campos: CPF, nome, nome preferido, tipo, mesa
   - Relacionamentos: User (1:1), Projects (1:N)

4. **Project**
   - Representa projetos
   - Campos: título, data de início
   - Relacionamentos: Professional (N:1), Budgets (1:N)

5. **Budget**
   - Representa orçamentos
   - Campos: descrição, status (pending/approved/rejected/finished)
   - Relacionamentos: Project (N:1), Company (N:1), Tickets (1:N), Sales (1:N)

6. **Ticket**
   - Sistema de tickets para comunicação
   - Campos: mensagem, URL do arquivo
   - Relacionamentos: User (N:1), Budget (N:1)

7. **Sale**
   - Registro de vendas
   - Campos: valor
   - Relacionamentos: Budget (N:1), Company (N:1)

## Segurança

### Autenticação e Autorização
- Autenticação via JWT (JSON Web Tokens)
- Diferentes níveis de acesso baseados em roles (E/P/G)
- Senhas armazenadas com hash usando bcrypt

### Validação de Dados
- Validação de entrada usando Zod
- Sanitização de dados
- Proteção contra injeção SQL via Prisma

## API Endpoints

### Autenticação
- POST /auth/login

### Usuários
- POST /users/register-professional
- POST /users/register-company
- GET /users/:id
- PUT /users/:id
- DELETE /users/:id

### Empresas
- GET /companies
- GET /companies/:id
- POST /companies
- PUT /companies/:id
- DELETE /companies/:id

### Profissionais
- GET /professionals
- GET /professionals/:id
- POST /professionals
- PUT /professionals/:id
- DELETE /professionals/:id

### Projetos
- GET /projects
- GET /projects/:id
- POST /projects
- PUT /projects/:id
- DELETE /projects/:id

### Orçamentos
- GET /budgets
- GET /budgets/:id
- POST /budgets
- PUT /budgets/:id
- DELETE /budgets/:id

### Tickets
- GET /tickets
- GET /tickets/:id
- POST /tickets
- PUT /tickets/:id
- DELETE /tickets/:id

### Vendas
- GET /sales
- GET /sales/:id
- POST /sales
- PUT /sales/:id
- DELETE /sales/:id

## Configuração e Deploy

### Requisitos
- Node.js 18+
- PostgreSQL 12+
- Docker (opcional)

### Variáveis de Ambiente
```
DATABASE_URL=postgresql://user:password@localhost:5432/pmsystem
JWT_SECRET=your_jwt_secret
PORT=3000
```

### Instalação
1. Clone o repositório
2. Instale as dependências: `npm install`
3. Configure as variáveis de ambiente
4. Execute as migrações: `npm run prisma:migrate`
5. Inicie o servidor: `npm run dev`

### Docker
O sistema pode ser executado usando Docker Compose:
```bash
docker-compose up -d
```

## Testes
- Testes unitários com Jest
- Executar testes: `npm test`

## Manutenção e Monitoramento
- Logs estruturados
- Tratamento de erros centralizado
- Middleware de logging

## Contribuição
1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## Licença
ISC 
