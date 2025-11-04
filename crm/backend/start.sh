#!/bin/sh
set -e
echo "=== START.SH SCRIPT EXECUTING ===" >&2
echo "Running database migrations..." >&2
npx prisma db push --accept-data-loss --skip-generate
echo "Starting server..." >&2
exec node src/server.js
