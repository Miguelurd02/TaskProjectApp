# Project Name

This repository contains two main services:
- **Backend** (folder: `backend`)
- **Frontend** (folder: `task-app`)

## Backend

The backend service is implemented in TypeScript and requires the following commands to run:

### Installation
cd backend
npm install
### Available Scripts

- `npm run dev` — Runs the backend in development mode with automatic restarts.
- `npm test` — Runs the backend test suite using Jest.
- `npm run build` — Compiles the TypeScript source code.
- `npm run cypress` — Opens Cypress for end-to-end testing. (Make sure to have the correct TypeScript config as per `tsconfig.cypress.json`)

### Starting Backend
npm run dev

## Frontend

The frontend service is located in the `task-app` folder and uses Expo.

### Installation
cd task-app
npm install

### Starting Frontend
This command will start the frontend application in your web browser.

## Requirements

- Node.js and npm installed on your machine.
- Recommended to use an IDE such as VSCode.

## Notes

Make sure to install dependencies separately in both `backend` and `task-app` folders. Then, you can run both services concurrently in your development environment.

