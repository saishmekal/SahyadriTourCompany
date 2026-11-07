# Stage 1: Build the TypeScript application
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY tsconfig.json ./
COPY src ./src

RUN npm run build


# Stage 2: Production runtime
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm ci --omit=dev && npm cache clean --force

# Copy compiled files with ownership assigned to node
COPY --chown=node:node --from=builder /app/dist ./dist

# Run the application without root privileges
USER node

EXPOSE 5000

CMD ["npm", "start"]