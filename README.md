# PM System API

## 🚀 Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
cd pmsystem-api
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
# Certifique-se de configurar a variável DATABASE_URL
```

4. Configure o Prisma:
```bash
# Gera o cliente Prisma
npx prisma generate

# Executa as migrações do banco de dados
npx prisma migrate dev
```

## 🏃‍♂️ Executando o Projeto

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm run build
npm start
```

## 🔄 Git Flow – Organização de Branches

Vamos seguir o Git Flow para manter organização e controle de versões.

### 📌 Fluxo de Branches

- **main** → versão de produção (sempre estável)
- **develop** → versão em desenvolvimento (integração das features)
- **feature/nome-da-tarefa** → para cada nova funcionalidade
- **fix/nome-do-bug** → para correções
- **release/x.x.x** → para preparar uma nova entrega
- **hotfix/x.x.x** → correções rápidas em produção

### 📦 Comandos Git recomendados

#### Criar uma nova feature
```bash
git checkout develop
git checkout -b feature/login-tela
```

#### Subir alterações
```bash
git add .
git commit -m "feat: tela de login criada"
git push origin feature/login-tela
```

### 📚 Tarefa para Todos

Estudar Git Flow antes de começar!

**Sugestão:** [Git Flow Workflow](https://www.atlassian.com/br/git/tutorials/comparing-workflows/gitflow-workflow)

## 🧪 Desenvolvimento Orientado a Testes (TDD) - Opcional

### Estrutura de Testes
- `test/` - Diretório principal para testes
  - Testes unitários e de integração são organizados por domínio
  - Exemplo: `test/User.test.ts`, `test/UserService.test.ts`

### Executando Testes
```bash
# Executa todos os testes
npm test

# Executa testes em modo watch
npm run test:watch

# Executa testes com cobertura
npm run test:coverage
```

### Boas Práticas de TDD
1. Escreva o teste primeiro (Red)
2. Implemente o código mínimo para passar (Green)
3. Refatore mantendo os testes passando (Refactor)

### Exemplo de Teste
```typescript
import User from "../src/model/User";

test("Should create a user", () => {
  const user = User.create(
    "john.doe@example.com",
    "password",
    new Date(),
    "E"
  );
  
  expect(user.getUserId()).toBeDefined();
  expect(user.getEmail()).toBe("john.doe@example.com");
  expect(user.getType()).toBe("E");
});
```
