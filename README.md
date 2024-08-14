# Kanban Board App

This is a simple Kanban board application built with Next.js, tRPC, Prisma, and React Beautiful DnD. It allows users to create boards, add cards to columns, and drag and drop cards between columns.

Demo: [View Kanban Board App](https://trpc-kanban-board-app-jfvc.vercel.app/)

## Features

- Create and delete boards
- Add cards to columns
- Drag and drop cards between columns
  
## Tech Stack
- Node.js
- PostgreSQL
- Prisma
- tRPC
- Auth0
- Typescript

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- PostgreSQL database

## Auth0 Integration

This application uses Auth0 for authentication. Follow these steps to set up Auth0:

1. Sign up for an account at [Auth0](https://auth0.com/).

2. Create a new application in the Auth0 dashboard.

3. Set the application type to "Regular Web Application".

4. In your Auth0 application settings, add the following URLs:
   - Allowed Callback URLs: `http://localhost:3000/api/auth/callback`
   - Allowed Logout URLs: `http://localhost:3000`
   - Allowed Web Origins: `http://localhost:3000`

5. Create a `.env.local` file in the root directory and add the following environment variables:

   ```
   AUTH0_SECRET='use command `openssl rand -hex 32` to generate a 32 bytes value'
   AUTH0_BASE_URL='http://localhost:3000'
   AUTH0_ISSUER_BASE_URL='https://{YOUR_AUTH0_DOMAIN}'
   AUTH0_CLIENT_ID='{YOUR_AUTH0_CLIENT_ID}'
   AUTH0_CLIENT_SECRET='{YOUR_AUTH0_CLIENT_SECRET}'
   ```

   Replace `{YOUR_AUTH0_DOMAIN}`, `{YOUR_AUTH0_CLIENT_ID}`, and `{YOUR_AUTH0_CLIENT_SECRET}` with your actual Auth0 application values.

6. Generate a secure random value for `AUTH0_SECRET` using the command:
   ```
   openssl rand -hex 32
   ```

7. Install the Auth0 Next.js SDK:
   ```
   npm install @auth0/nextjs-auth0
   ```

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/kanban-board-app.git
   cd kanban-board-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up your environment variables:
   Create a `.env` file in the root directory and add your database URL:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/kanban_db"
   ```

4. Generate Prisma client:
   ```
   npx prisma generate
   ```

5. Set up the database:
   ```
   npx prisma db push
   ```

6. Run the development server:
   ```
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Scripts

- `npm run dev`: Starts the development server
- `npm run build`: Builds the application for production
- `npm run start`: Starts the production server
- `npm run lint`: Runs the linter

## TODO

- [ ] Fix bugs:
  - [ ] Improve error handling for API calls
  - [ ] Address any console warnings or errors

- [x] Add homepage:
  - [x] Create a landing page with app information
  - [x] Implement user sign-up functionality
  - [x] Implement user login functionality
  - [x] Add user authentication flow

- [x] Add authentication:
  - [x] Implement user registration and login
  - [x] Secure routes and API endpoints

- [ ] Add custom columns:
  - [ ] Allow users to create, edit, and delete columns
  - [ ] Implement column reordering

- [ ] Add confirmation modals:
  - [ ] Implement confirmation dialogs for delete actions (boards, columns, cards)

- [ ] Improve loading states:
  - [ ] Add skeleton loaders for boards and cards
  - [ ] Implement better loading indicators for API calls

- [ ] Enhance drag and drop functionality:
  - [ ] Add visual feedback during drag operations
  - [ ] Implement smooth animations for card movements

- [ ] Add AI voice task creation:
  - [ ] Integrate OpenAI's Whisper for speech-to-text conversion
  - [ ] Allow users to add tasks using voice commands

- [ ] Add background music feature:
  - [ ] Integrate lofi music player
  - [ ] Allow users to toggle background music on/off

- [ ] Add timed tasks:
  - [ ] Implement a Pomodoro-style timer for tasks
  - [ ] Allow users to set custom time limits for tasks
  - [ ] Add notifications for task time completion

- [ ] Improve responsiveness and design:
  - [ ] Optimize layout for mobile devices
  - [ ] Implement a responsive design for all screen sizes

- [ ] Refactor code:
  - [ ] Improve code organization and modularity
  - [ ] Implement best practices and design patterns


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
