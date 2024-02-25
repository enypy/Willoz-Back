# Willoz-Back

Willoz-Back is a Node.js/Express/MongoDB TypeScript-based API for managing real estate sale offers. It includes features for creating, reading, updating, and deleting offers, as well as user authentication via email/password and JWT token management. Additionally, it provides functionality for uploading and retrieving images associated with the offers.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/votre-utilisateur/willoz-back.git
```

2. Install dependencies:

```bash
cd willoz-back
npm install
```

3. Set up environment variables:

Create a `.env` file in the root directory and provide the following variables:

```
MONGO_URI=mongodb://localhost:27017/willoz
JWT_SECRET=your_secret_key
JWT_LIFETIME=5d
```

## Usage

To start the server, run:

```bash
npm start
```

The server will start at `http://localhost:3000` by default, unless configured otherwise via the `PORT` environment variable.

## Endpoints

### Authentication

- `POST /api/v1/auth/register`: Register a new user.
- `POST /api/v1/auth/login`: Login with email and password to obtain a JWT token.

### Real Estate Offers

- `GET /api/v1/listings`: Retrieve all real estate offers.
- `GET /api/v1/listings/:id`: Retrieve a specific offer by ID.
- `POST /api/v1/listings`: Create a new real estate offer (requires authentication).
- `PATCH /api/v1/listings/:id`: Update an existing real estate offer (requires authentication).
- `DELETE /api/v1/listings/:id`: Delete a real estate offer (requires authentication).

### Images

- `POST /api/v1/images/upload`: Upload an image for a real estate offer (requires authentication).
- `GET /api/v1/images/:filename`: Retrieve an image by filename.

## Dependencies

- `bcryptjs`: Password hashing.
- `cors`: Cross-Origin Resource Sharing middleware.
- `express`: Web framework for Node.js.
- `express-async-errors`: Handle asynchronous errors in Express.
- `express-fileupload`: Middleware for handling file uploads.
- `express-rate-limit`: Rate limiting middleware for Express.
- `file-type`: Detect file types.
- `helmet`: HTTP headers protection middleware.
- `http-status-codes`: HTTP status code constants.
- `jsonwebtoken`: JWT token generation and verification.
- `mongoose`: MongoDB object modeling tool.
- `uuid`: Generate UUIDs.
- `xss`: Cross-Site Scripting protection.

## Dev Dependencies

- `@types/bcryptjs`: TypeScript type definitions for bcryptjs.
- `@types/cors`: TypeScript type definitions for cors.
- `@types/express`: TypeScript type definitions for express.
- `@types/express-fileupload`: TypeScript type definitions for express-fileupload.
- `@types/jsonwebtoken`: TypeScript type definitions for jsonwebtoken.
- `@types/node`: TypeScript type definitions for Node.js.
- `@types/uuid`: TypeScript type definitions for uuid.
- `typescript`: TypeScript compiler.
