# Kanban Board App

This is a Kanban board application built with Next.js, tRPC, Prisma, and React Beautiful DnD. It allows users to create boards, add cards to columns, and drag and drop cards between columns.

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

5. Create a `.env` file in the root directory and add the following environment variables:

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

## Jamendo Integration

This application uses Jamendo for the lofi music player. Follow these steps to set up Jamendo:

1. Sign up for a developer account at [Jamendo](https://developer.jamendo.com/).

2. Create a new application in the Jamendo developer dashboard.

3. Obtain your Client ID from the application settings.

4. Add the following environment variable to your `.env` file:

   ```
   JAMENDO_CLIENT_ID='{YOUR_JAMENDO_CLIENT_ID}'
   ```

   Replace `{YOUR_JAMENDO_CLIENT_ID}` with your actual Jamendo Client ID.

5. The application is now set up to use Jamendo's API for fetching lofi tracks.

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/emmanuel39hanks/kanban-board-app.git
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

- [x] Add confirmation modals:
  - [x] Implement confirmation dialogs for delete actions (boards, columns, cards)

- [ ] Improve loading states:
  - [ ] Add skeleton loaders for boards and cards
  - [ ] Implement better loading indicators for API calls

- [ ] Enhance drag and drop functionality:
  - [ ] Add visual feedback during drag operations
  - [ ] Implement smooth animations for card movements

- [ ] Add AI voice task creation:
  - [ ] Integrate OpenAI's Whisper for speech-to-text conversion
  - [ ] Allow users to add tasks using voice commands

- [x] Add background music feature:
  - [x] Integrate lofi music player
  - [x] Allow users to toggle background music on/off

- [x] Add timed tasks:
  - [x] Implement a Pomodoro-style timer for tasks
  - [x] Allow users to set custom time limits for tasks
  - [x] Add notifications/toasts for task time completion

- [ ] Improve responsiveness and design:
  - [ ] Optimize layout for mobile devices
  - [ ] Implement a responsive design for all screen sizes

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
