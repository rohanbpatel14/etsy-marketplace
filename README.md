# Etsy - Online E-commerce Marketplace

This project is a full-stack e-commerce web application inspired by Etsy, built with React, Node.js, Express, MongoDB, and GraphQL.

## Table of Contents

- [Demo Video](#-demo-video)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Frontend Structure](#frontend-structure)
- [Backend Structure](#backend-structure)
- [Deployment](#deployment)

## 📺 Demo Video

Check out this short video demonstration to see Etsy Online E-Commerce Marketplace in action on YouTube:

[![Etsy Marketplace Demo Video](https://img.youtube.com/vi/kAzKOAmTkGc/0.jpg)](https://youtu.be/kAzKOAmTkGc)

## Features

- User authentication and authorization
- User profile management
- Shop creation and management
- Product listing and searching
- Shopping cart functionality
- Order placement and history
- Image upload and management
- Currency conversion
- Responsive design

## Tech Stack

### Frontend
- React 17+
- Redux for state management
- Apollo Client for GraphQL integration
- React Router for navigation
- Styled-components for component-level styling
- Axios for REST API calls
- Bootstrap for responsive design
- Material UI for components and icons
- Web-vitals for performance monitoring

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose ODM
- GraphQL with Apollo Server
- JWT for authentication
- Multer for image uploads
- AWS S3 for image storage

## Prerequisites

- Node.js (v14+ recommended)
- MongoDB
- AWS account (for hosting and S3 image storage)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/rohanbpatel14/etsy-marketplace.git
   cd etsy-marketplace
   ```

2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```
   cd ../frontend
   npm install
   ```

## Configuration

### Backend

1. Update `config.js` file in the `backend/utils/` directory with the following variables:
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

## Usage

1. Start the backend server:
   ```
   cd backend
   npm start
   ```

2. Start the frontend development server:
   ```
   cd frontend
   npm start
   ```

The application will be available at `http://localhost:3000`.

## API Documentation

For further detailed API documentation information, please refer to [API_DOCS.md](./Backend/API_DOCS.md).

## Database Schema

The application uses MongoDB with Mongoose ODM. The main models are:

- User
- Shop
- Item
- Order

For detailed schema information, refer to the files in the `backend/schemas` directory.

## Frontend Structure

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Cart/
│   │   ├── Footer/
│   │   ├── HomePage/
│   │   ├── Item/
│   │   ├── loginSignup/
│   │   ├── NavBar/
│   │   ├── OrderHistory/
│   │   ├── Profile/
│   │   ├── Search/
│   │   └── Shop/
│   ├── config/
│   ├── GraphQL/
│   │   ├── Mutations/
│   │   └── Queries/
│   ├── service/
│   ├── store/
│   │   ├── actions/
│   │   └── reducers/
│   ├── utils/
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```
### State Management

- Redux is used for global state management
- The store is configured in `src/store/`
- Actions and reducers are organized by feature (e.g., user, cart, currency)

### Styling

- A combination of CSS modules and styled-components is used for styling
- Component-specific styles are co-located with their respective components

### Routing

- React Router is used for navigation
- Route definitions are centralized in `src/App.js`

### API Integration

- GraphQL queries and mutations are defined in `src/GraphQL/`
- Apollo Client is configured in `src/App.js`
- RESTful API calls use Axios and are organized in `src/service/`

### Build and Deployment

To create a production build:

```
cd frontend
npm run build
```

This creates a `build` directory with optimized and minified assets ready for deployment.

### Browser Support

The application is tested and supported on the following browsers:

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## Backend Structure

```
backend/
├── controllers/
├── models/
├── routes/
├── schemas/
│   └── TypeDefs/
|   └── index.js
├── utils/
├── index.js
├── API_DOCS.md
├── package.json
└── README.md
```

## Deployment

This project is deployed on Amazon Web Services (AWS). Here's an overview of the deployment setup:

1. **Database**: MongoDB Atlas is used for the database, providing a fully managed cloud database solution.

2. **Backend**: 
   - The Node.js backend is deployed on AWS Elastic Beanstalk, which handles capacity provisioning, load balancing,         auto-scaling, and application health monitoring.
   - Environment variables are configured in the Elastic Beanstalk console.

3. **Frontend**:
   - The React frontend is deployed to AWS S3 as a static website.
   - Amazon CloudFront is used as a CDN to serve the frontend assets globally with low latency.

4. **Image Storage**: AWS S3 is used for storing and serving user-uploaded images.

5. **Domain and SSL**: 
   - Route 53 is used for domain management.
   - AWS Certificate Manager provides SSL certificates for secure HTTPS connections.

### Deployment Steps

1. Set up a MongoDB Atlas cluster and obtain the connection string.
2. Create an S3 bucket for image storage and configure CORS settings.
3. Create an Elastic Beanstalk environment for the backend:
   - Choose the Node.js platform.
   - Configure environment variables (MongoDB URI, AWS credentials, etc.).
4. Create an S3 bucket for the frontend and enable static website hosting.
5. Set up a CloudFront distribution pointing to the frontend S3 bucket.
6. Configure Route 53 for domain management and create necessary record sets.
7. Obtain an SSL certificate from AWS Certificate Manager and configure it with CloudFront.