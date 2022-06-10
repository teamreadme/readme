#!/bin/bash
echo "Installing dependencies"
npm ci

echo "Building prisma client"
npm run prisma-generate

echo "Building app"
npm run build

echo "Migrating database" #https://community.render.com/t/release-command-for-db-migrations/247
npm run migrate