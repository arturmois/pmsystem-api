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

### Authentication & Users
- POST /api/users/login - User login
- POST /api/users/professional - Register a new professional user
- POST /api/users/company - Register a new company user
- GET /api/users - Get all users (requires authentication)

### Projects
- POST /api/projects - Create a new project (requires authentication)
- GET /api/projects/:userId - Get projects by user ID (requires authentication)
- GET /api/projects - Get all projects (requires authentication)
- PUT /api/projects/:id - Update a project (requires authentication)
- DELETE /api/projects - Delete a project (requires authentication)

### Budgets
- POST /api/budgets - Create a new budget (requires authentication)
- GET /api/budgets - Get all budgets (requires authentication)
- PUT /api/budgets/:id - Update a budget (requires authentication)
- DELETE /api/budgets/:id - Delete a budget (requires authentication)

### Tickets
- POST /api/tickets - Create a new ticket (requires authentication)
- GET /api/tickets - Get all tickets (requires authentication)
- PUT /api/tickets/:id - Update a ticket (requires authentication)
- DELETE /api/tickets/:id - Delete a ticket (requires authentication)
- POST /api/tickets/:id/upload - Upload a file to a ticket (requires authentication)

### Sales
- POST /api/sales - Create a new sale (requires authentication)
- GET /api/sales/:id - Get a sale by ID (requires authentication)
- PUT /api/sales/:id - Update a sale (requires authentication)
- DELETE /api/sales/:id - Delete a sale (requires authentication)

Note: All endpoints except user registration and login require authentication via JWT token in the Authorization header.

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
