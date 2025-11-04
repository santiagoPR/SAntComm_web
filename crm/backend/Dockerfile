# Use Node.js 20 Alpine
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy prisma schema
COPY prisma ./prisma

# Generate Prisma Client
RUN npx prisma generate

# Copy application source
COPY src ./src

# Expose port
EXPOSE 5000

# Start command
CMD ["node", "src/server.js"]
