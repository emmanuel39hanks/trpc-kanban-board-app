# Kanban Board App

This is a simple Kanban board application built with Next.js, tRPC, Prisma, and React Beautiful DnD. It allows users to create boards, add cards to columns, and drag and drop cards between columns.

Demo: [View Kanban Board App](https://trpc-kanban-board-app-jfvc.vercel.app/)

## Features

- Create and delete boards
- Add cards to columns
- Drag and drop cards between columns
  
## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- PostgreSQL database

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

- [ ] Add homepage:
  - [ ] Create a landing page with app information
  - [ ] Implement user sign-up functionality
  - [ ] Implement user login functionality
  - [ ] Add user authentication flow

- [ ] Add authentication:
  - [ ] Implement user registration and login
  - [ ] Secure routes and API endpoints

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

- [ ] Improve responsiveness:
  - [ ] Optimize layout for mobile devices
  - [ ] Implement a responsive design for all screen sizes

- [ ] Add AI voice task creation:
  - [ ] Integrate OpenAI's Whisper for speech-to-text conversion
  - [ ] Allow users to add tasks using voice commands

- [ ] Add background music feature:
  - [ ] Integrate lofi music player
  - [ ] Allow users to toggle background music on/off

- [ ] Refactor code:
  - [ ] Improve code organization and modularity
  - [ ] Implement best practices and design patterns

- [ ] Add timed tasks:
  - [ ] Implement a Pomodoro-style timer for tasks
  - [ ] Allow users to set custom time limits for tasks
  - [ ] Add notifications for task time completion

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
