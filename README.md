# Library Management

Developed Library Management System using Express, TypeScript, and MongoDB (via Mongoose)

## Project Setup

- npm i -y
- tsc -init
- npm i express mongodb mongoose typescript ts-node-dev dotenv zod
- tsconfig.json file open
    - update "rootDir": "./src/", "outDir": "./dist/"
- package.json file open
    - write on script : "dev": "ts-node-dev --respawn --transpile-only src/server.ts"
- npm run dev

## Project Structure

```bash
├── node_modules/          # Third-party dependencies
├── src/                   # Source code directory
│   ├── app/               # Application components
│   │   ├── controllers/   # 🎮 Controller files
│   │   ├── interfaces/    # 📜 TypeScript interfaces
│   │   ├── models/        # 🏗️ Database models
│   │   └── validationSchema/  # ✅ Validation schemas
│   ├── app.ts             # Main application config
│   └── server.ts          # Server entry point
├── .env                   # 🌱 Environment variables
├── .gitignore             # 🙈 Git ignore rules
├── package-lock.json      # 🔒 Dependency lock file
├── package.json           # 📦 Project metadata & scripts
└── tsconfig.json          # config typescript run file
```

## Project Features

- Schema validation
- Business logic enforcement
- Aggregation pipeline
- Mongoose static method
- Generic error response
- Mongoose middleware (pre, post)
- Filtering features , limit, group, lookup, sort, sortBy, populate, unwind (Mongoose Query)

## Project API

Book
===========
- Create Book
- Get All Books with
    -filter
    -sort
    -limit
- Get Book by ID
- Update Book
- Delete Book

Borrow
===========
- Borrow a Book
    - implement here business logic with Book collection
- Borrowed Books Summary (Using Aggregation)
    - group
    - sum
    - count