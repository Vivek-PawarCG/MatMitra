# Stage 1: Build React frontend
FROM node:20-alpine AS client-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

# Stage 2: Production server
FROM node:20-alpine AS production

# 🛡️ SECURITY: Run as non-root user
RUN addgroup -S nodeapp && adduser -S nodeapp -G nodeapp
WORKDIR /app

# ⚡ EFFICIENCY: Install production dependencies only
COPY server/package*.json ./
RUN npm ci --omit=dev

COPY server/ ./
COPY --from=client-build /app/client/dist ./public

# 🛡️ SECURITY: Set ownership and switch user
RUN chown -R nodeapp:nodeapp /app
USER nodeapp

ENV NODE_ENV=production
EXPOSE 8080

CMD ["node", "index.js"]
