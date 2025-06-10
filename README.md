# PMS System API

API for managing projects, budgets, and tickets in a professional management system.

## Features

- User authentication (Professional, Company, Manager)
- Project management
- Budget management
- Ticket system
- Sales tracking

## Tech Stack

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Zod Validation

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL
- Docker and Docker Compose (optional, for containerized setup)

## Docker Setup

1. Make sure you have Docker and Docker Compose installed on your system.

2. Start the containers:
```bash
docker-compose up -d
```

3. Run database migrations:
```bash
docker-compose exec api npm run prisma:migrate
```

To stop the containers:
```bash
docker-compose down
```

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pmsystem-api.git
cd pmsystem-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following content:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/app"
PORT=3000
JWT_SECRET="your-secret-key-change-in-production"
JWT_EXPIRATION=1d
```

4. Generate Prisma client:
```bash
npm run prisma:generate
```

5. Run database migrations:
```bash
npm run prisma:migrate
```

## Running the Application

Development mode:
```bash
npm run dev
```

Production build:
```bash
npm run build
npm start
```

## API Endpoints

### Authentication
- POST /api/users/login
- POST /api/users/professional
- POST /api/users/company
- GET /api/users/user

### Projects
- POST /api/projects
- PUT /api/projects/:id
- DELETE /api/projects/:id
- GET /api/projects/:id
- GET /api/projects

### Budgets
- POST /api/budgets
- PUT /api/budgets/:id
- DELETE /api/budgets/:id
- GET /api/budgets/:id
- GET /api/budgets

### Tickets
- POST /api/tickets
- PUT /api/tickets/:id
- DELETE /api/tickets/:id
- GET /api/tickets/:id
- GET /api/tickets

## Data Models

### User
- user_id (UUID)
- email (String)
- password (String)
- birth_date (DateTime)
- role (String: E/P/G)
- created_at (DateTime)
- updated_at (DateTime)

### Company
- company_id (UUID)
- user_id (UUID)
- cnpj (String)
- address (String)
- fantasy_name (String)
- social_reason (String)
- segment (String)
- monthly_fee (Float)
- commission (Float)
- created_at (DateTime)
- updated_at (DateTime)

### Professional
- professional_id (UUID)
- user_id (UUID)
- cpf (String)
- name (String)
- preferred_name (String)
- type (String)
- desk (String)
- created_at (DateTime)
- updated_at (DateTime)

### Project
- project_id (UUID)
- professional_id (UUID)
- title (String)
- start_date (DateTime)
- created_at (DateTime)
- updated_at (DateTime)

### Budget
- budget_id (UUID)
- project_id (UUID)
- company_id (UUID)
- description (String)
- status (String)
- created_at (DateTime)
- updated_at (DateTime)

### Ticket
- ticket_id (UUID)
- budget_id (UUID)
- user_id (UUID)
- message (String)
- file_url (String)
- created_at (DateTime)
- updated_at (DateTime)

### Sale
- sale_id (UUID)
- budget_id (UUID)
- company_id (UUID)
- value (Float)
- created_at (DateTime)
- updated_at (DateTime)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
