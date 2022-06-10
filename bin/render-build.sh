#!/bin/bash
echo "Installing dependencies"
npm install ci

echo "Building app"
npm run build

echo "Migrating database" #https://community.render.com/t/release-command-for-db-migrations/247
npx prisma migrate deploy