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

- node_modules (folder)
- src (folder)
    * app (folder)
        * cotrollers (folder)
            *controller files (file)
        * interfaces (folder)
            *interfaces files (file)
        * models (folder)
            *models file (file)
        * validationSchema (folder)
            *validations file (file)
    * app.ts (file)
    * server.ts (file)
- .env
- .gitignore
-  package-lock.json
-  package.json
-  tsconfig.json
