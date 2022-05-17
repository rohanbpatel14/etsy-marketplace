# Backend

This is the backend server for **Etsy - Online E-commerce Marketplace** application built with Node.js, Express, MongoDB, and GraphQL.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [File Structure](#file-structure)

## Features

- User authentication and authorization using JWT
- CRUD operations for users, shops, items, and orders
- Image upload functionality using AWS S3
- GraphQL API for flexible data querying
- RESTful API endpoints for traditional HTTP requests

## Prerequisites

- Node.js (v14+ recommended)
- MongoDB
- AWS account (for S3 image storage)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/rohanbpatel14/etsy-marketplace.git
   cd etsy-marketplace
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```
   PORT=8080
   ATLAS_URI=your_mongodb_connection_string
   FRONTEND=http://localhost:3000
   SECRET=your_jwt_secret
   AWS_BUCKET_NAME=your_s3_bucket_name
   AWS_BUCKET_REGION=your_s3_bucket_region
   AWS_ACCESS_KEY=your_aws_access_key
   AWS_SECRET_KEY=your_aws_secret_key
   ```

## Configuration

- Update the `config.js` file in the `utils` directory if you need to change any default configurations.
- Modify the `passport.js` file in the `utils` directory to adjust authentication strategies if needed.

## Usage

To start the server in development mode:

```
npm start
```

The server will start on `http://localhost:8080` by default.

## API Documentation

### REST Endpoints

- `/user` - User-related operations
- `/shop` - Shop-related operations
- `/item` - Item-related operations
- `/order` - Order-related operations
- `/images` - Image upload and retrieval

### GraphQL Endpoint

- `/graphql` - GraphQL API endpoint

For detailed API documentation, please refer to [API_DOCS.md](./API_DOCS.md) for more information about the API endpoints, request/response formats, and authentication requirements.

## Database Schema

The application uses MongoDB with Mongoose ODM. The main models are:

- User
- Shop
- Item
- Order

For detailed schema information, refer to the files in the `models` directory.

## File Structure

```
.
├── controllers/
├── models/
├── routes/
├── schemas/
│   └── TypeDefs/
├── utils/
├── .env
├── index.js
├── package.json
└── README.md
```