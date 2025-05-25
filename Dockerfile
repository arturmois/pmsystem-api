FROM node:20-alpine

WORKDIR /app

ENV PORT=3000
ENV DATABASE_URL=postgresql://postgres:postgres@localhost:5432/app
EXPOSE ${PORT}

COPY package*.json .

RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

CMD ["npm", "start"]