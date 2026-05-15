# Peer Recognition App

## Overview
## Features
## Tech Stack
## Setup Instructions
## Environment Variables
## Database Setup
## Running the Project
## Project Structure
## API Endpoints
## Authentication Flow
## Authorization Rules
## Validation Rules
## Database Design
## Architectural Overview
## AI Usage
## Assumptions
## Trade-offs
## Future Improvements
## Screenshots (Optional)
## Deployment (Optional)
## Git Commit Strategy
1. Project Title
# Peer Recognition App
2. Overview
what app does
purpose
business problem solved
A peer recognition platform where employees can publicly appreciate teammates by associating recognitions with company values, reactions, and comments.
3. Features
   ## Features

- User authentication
- JWT authorization
- Public recognition feed
- Reactions and comments
- User profiles
- Leaderboards and stats
- Pagination and filtering
- Authorization checks
4. Tech Stack
  ## Tech Stack

Frontend:
- Next.js
- React
- Tailwind CSS

Backend:
- Next.js API Routes
- TypeScript

Database:
- Prisma ORM
- SQLite

Authentication:
- JWT
- bcryptjs
5. Setup Instructions
  ## Setup Instructions

### Clone Repository

git clone YOUR_REPO_LINK

### Install Dependencies

npm install

### Run Database Migrations

npx prisma migrate dev

### Generate Prisma Client

npx prisma generate

### Start Application

npm run dev
6. Environment Variables
## Environment Variables

DATABASE_URL="file:./dev.db"
7. Database Setup

Mention:

Prisma
SQLite
migrations
Database uses SQLite with Prisma ORM.
Migrations are managed through Prisma migrate.
8. Running the Project
## Running the Project

npm run dev

Open:
http://localhost:3000
9. Project Structure
src/
├── app/
├── components/
├── lib/
├── prisma/

10. API Endpoints
    POST /api/register
POST /api/login
POST /api/recognitions
GET /api/recognitions
POST /api/reactions
POST /api/comments
GET /api/stats

11. Authentication Flow
    Passwords are hashed using bcrypt.
JWT tokens are generated on login and sent in Authorization headers for protected APIs.

12. Authorization Rules
    - Only recognition giver can delete recognition
- Only comment author can delete comment
- Users cannot react to their own recognitions

13. Validation Rules
    - No self recognition
- Message required
- Comment cannot be empty
- Valid company values only

15. Architectural Overview
    Frontend pages are built using Next.js App Router.
Backend APIs are implemented using Next.js Route Handlers.
Prisma ORM manages database access and relationships.

16. AI Usage
    ## AI Usage

ChatGPT was used for:
- API scaffolding
- Prisma schema refinement
- Validation logic
- UI scaffolding
- Query optimization

All generated code was manually reviewed and tested.

17. Assumptions
    - All users belong to one organization
- No admin roles required
- Public feed visible to authenticated users only

18. Trade-offs
    - Focused on backend correctness over UI polish
- SQLite chosen for rapid setup
- No real-time updates implemented

19. Future Improvements
    - Docker support
- Real-time updates
- Better multi-user selection UI
- Charts and analytics
- Notifications

