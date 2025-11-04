#!/bin/sh
echo "Running database migrations..."
npx prisma db push --accept-data-loss --skip-generate
echo "Starting server..."
node src/server.js
