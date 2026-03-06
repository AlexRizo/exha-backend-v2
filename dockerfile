FROM node:22-alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install

COPY . .

EXPOSE 8080

CMD ["sh", "-c", "npx prisma generate && pnpm start:dev"]