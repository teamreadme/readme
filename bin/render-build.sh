#!/bin/bash
echo "Installing dependencies"
npm install --production=false #Since render uses the same env for build and deploy, smh

echo "Building prisma client"
npm run prisma-generate

echo "Building app"
npm run build

echo "Migrating database" #https://community.render.com/t/release-command-for-db-migrations/247
npm run migrate