# Use Node.js 20 Alpine
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files from crm/backend
COPY crm/backend/package*.json ./

# Install dependencies
RUN npm install --production

# Copy prisma schema from crm/backend
COPY crm/backend/prisma ./prisma

# Generate Prisma Client
RUN npx prisma generate

# Copy application source from crm/backend
COPY crm/backend/src ./src

# Expose port
EXPOSE 5000

# Start command with database push
CMD npx prisma db push --accept-data-loss && node src/server.js
