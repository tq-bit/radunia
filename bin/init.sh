#!/bin/bash

# Backend setup
cd ../authenticator-api

echo "Api: Creating environment file ..."
echo "PORT=3001
HOST=http://localhost
NODE_ENV=development
API_VERSION=/v1
PATH_DOCS=/api-docs
PATH_SPECS=/api-specs
DB_HOST_ADMIN=mongodb

AUTH_SECRET=12345+
API_SECRET=12345" > .env

echo "Api: Installing node modules ..."
cd ./authenticator-api
npm install

echo "Api: Setup comple. "

# App setup
cd ../vite-login-app

echo "App: Installing modules ..."
npm install

echo "App: Setup complete"

echo "🌇 Welcome to Radunia"

exit 0