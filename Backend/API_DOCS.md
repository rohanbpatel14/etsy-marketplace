# API Documentation

This document provides detailed information about the API endpoints available in for the Etsy online e-commerce marketplace backend. The API is divided into REST endpoints and a GraphQL endpoint.

## Table of Contents

1. [Authentication](#authentication)
2. [REST Endpoints](#rest-endpoints)
   - [User Routes](#user-routes)
   - [Shop Routes](#shop-routes)
   - [Item Routes](#item-routes)
   - [Order Routes](#order-routes)
   - [Image Upload Route](#image-upload-route)
3. [GraphQL Endpoint](#graphql-endpoint)
   - [Queries](#queries)
   - [Mutations](#mutations)

## Authentication

Most endpoints require authentication using JSON Web Tokens (JWT). Include the JWT in the Authorization header of your requests:

```
Authorization: Bearer <your_jwt_token>
```

## REST Endpoints

### User Routes

#### POST /user/signup
Create a new user account.

Request body:
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "securepassword"
}
```

Response:
```json
{
  "status": "ok",
  "token": "Bearer <jwt_token>",
  "user": {
    "_id": "user_id",
    "EMAIL": "user@example.com",
    "NAME": "John Doe"
  }
}
```

#### POST /user/login
Log in an existing user.

Request body:
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

Response:
```json
{
  "status": "ok",
  "token": "Bearer <jwt_token>",
  "user": {
    "_id": "user_id",
    "EMAIL": "user@example.com",
    "NAME": "John Doe"
  }
}
```

#### PUT /user/edit-profile
Update user profile information. Requires authentication.

Request body:
```json
{
  "name": "John Smith",
  "phonenumber": "1234567890",
  "gender": "Male",
  "DOB": "1990-01-01",
  "address": "123 Main St",
  "city": "New York",
  "country": "USA",
  "profilephoto": "image_url"
}
```

Response:
```json
{
  "status": "ok",
  "user": {
    "_id": "user_id",
    "EMAIL": "user@example.com",
    "NAME": "John Smith",
    "PHONE_NO": "1234567890",
    "GENDER": "Male",
    "DOB": "1990-01-01",
    "ADDRESS": "123 Main St",
    "CITY": "New York",
    "COUNTRY": "USA",
    "PROFILE_IMAGE": "image_url"
  }
}
```

### Shop Routes

#### POST /shop/check-shop-name
Check if a shop name is available. Requires authentication.

Request body:
```json
{
  "shopname": "My Awesome Shop"
}
```

Response:
```json
{
  "status": "ok",
  "available": true
}
```

#### POST /shop/add-new-shop
Create a new shop. Requires authentication.

Request body:
```json
{
  "SHOP_NAME": "My Awesome Shop",
  "OWNER": "user_id"
}
```

Response:
```json
{
  "status": "ok",
  "shop": {
    "_id": "shop_id",
    "SHOP_NAME": "My Awesome Shop",
    "OWNER": "user_id"
  }
}
```

#### GET /shop/details
Get shop details.

Query parameters:
- `_id`: Shop ID

Response:
```json
{
  "status": "ok",
  "shop": {
    "_id": "shop_id",
    "SHOP_NAME": "My Awesome Shop",
    "SHOP_IMAGE": "image_url",
    "SHOP_ITEMS": ["item_id1", "item_id2"],
    "OWNER": "user_id"
  }
}
```

### Item Routes

#### POST /item/add-new
Add a new item. Requires authentication.

Request body:
```json
{
  "ITEM_NAME": "Product Name",
  "SHOP": "shop_id",
  "CATEGORY": "Category",
  "ITEM_IMAGE": "image_url",
  "PRICE": 19.99,
  "QUANTITY_AVAILABLE": 100,
  "DESCRIPTION": "Product description"
}
```

Response:
```json
{
  "status": "ok",
  "item": {
    "_id": "item_id",
    "ITEM_NAME": "Product Name",
    "SHOP": "shop_id",
    "CATEGORY": "Category",
    "ITEM_IMAGE": "image_url",
    "PRICE": 19.99,
    "QUANTITY_AVAILABLE": 100,
    "QUANTITY_SOLD": 0,
    "DESCRIPTION": "Product description"
  }
}
```

#### POST /item/edit
Edit an existing item. Requires authentication.

Request body:
```json
{
  "_id": "item_id",
  "ITEM_NAME": "Updated Product Name",
  "CATEGORY": "Updated Category",
  "ITEM_IMAGE": "new_image_url",
  "PRICE": 24.99,
  "QUANTITY_AVAILABLE": 150,
  "DESCRIPTION": "Updated product description"
}
```

Response:
```json
{
  "status": "ok",
  "item": {
    "_id": "item_id",
    "ITEM_NAME": "Updated Product Name",
    "SHOP": "shop_id",
    "CATEGORY": "Updated Category",
    "ITEM_IMAGE": "new_image_url",
    "PRICE": 24.99,
    "QUANTITY_AVAILABLE": 150,
    "QUANTITY_SOLD": 0,
    "DESCRIPTION": "Updated product description"
  }
}
```

#### GET /item/all
Get all items.

Response:
```json
{
  "status": "ok",
  "items": [
    {
      "_id": "item_id1",
      "ITEM_NAME": "Product 1",
      "SHOP": "shop_id",
      "CATEGORY": "Category 1",
      "ITEM_IMAGE": "image_url1",
      "PRICE": 19.99,
      "QUANTITY_AVAILABLE": 100,
      "QUANTITY_SOLD": 0,
      "DESCRIPTION": "Product 1 description"
    },
    {
      "_id": "item_id2",
      "ITEM_NAME": "Product 2",
      "SHOP": "shop_id",
      "CATEGORY": "Category 2",
      "ITEM_IMAGE": "image_url2",
      "PRICE": 29.99,
      "QUANTITY_AVAILABLE": 50,
      "QUANTITY_SOLD": 0,
      "DESCRIPTION": "Product 2 description"
    }
  ]
}
```

#### GET /item/details
Get item details.

Query parameters:
- `_id`: Item ID

Response:
```json
{
  "status": "ok",
  "item": {
    "_id": "item_id",
    "ITEM_NAME": "Product Name",
    "SHOP": "shop_id",
    "CATEGORY": "Category",
    "ITEM_IMAGE": "image_url",
    "PRICE": 19.99,
    "QUANTITY_AVAILABLE": 100,
    "QUANTITY_SOLD": 0,
    "DESCRIPTION": "Product description"
  }
}
```

#### GET /item/search
Search for items.

Query parameters:
- `searchWord`: Search keyword

Response:
```json
{
  "status": "ok",
  "items": [
    {
      "_id": "item_id1",
      "ITEM_NAME": "Matching Product 1",
      "SHOP": "shop_id",
      "CATEGORY": "Category 1",
      "ITEM_IMAGE": "image_url1",
      "PRICE": 19.99,
      "QUANTITY_AVAILABLE": 100,
      "QUANTITY_SOLD": 0,
      "DESCRIPTION": "Matching Product 1 description"
    },
    {
      "_id": "item_id2",
      "ITEM_NAME": "Matching Product 2",
      "SHOP": "shop_id",
      "CATEGORY": "Category 2",
      "ITEM_IMAGE": "image_url2",
      "PRICE": 29.99,
      "QUANTITY_AVAILABLE": 50,
      "QUANTITY_SOLD": 0,
      "DESCRIPTION": "Matching Product 2 description"
    }
  ]
}
```

### Order Routes

#### POST /order/add
Create a new order. Requires authentication.

Request body:
```json
{
  "userId": "user_id",
  "addedItems": [
    {
      "_id": "item_id1",
      "ITEM_NAME": "Product 1",
      "PRICE": 19.99,
      "quantityInCart": 2,
      "hasGiftWrap": true,
      "message": "Gift message"
    },
    {
      "_id": "item_id2",
      "ITEM_NAME": "Product 2",
      "PRICE": 29.99,
      "quantityInCart": 1,
      "hasGiftWrap": false,
      "message": ""
    }
  ],
  "total": 69.97
}
```

Response:
```json
{
  "status": "ok",
  "message": "Order created successfully"
}
```

#### GET /order/get
Get user's order history. Requires authentication.

Query parameters:
- `userId`: User ID

Response:
```json
{
  "status": "ok",
  "ORDER_HISTORY": [
    {
      "_id": "order_id1",
      "ORDER_DATE": "2023-05-01",
      "TOTAL": 69.97,
      "ORDER_ITEMS": [
        {
          "ORDER_ITEM": {
            "_id": "item_id1",
            "ITEM_NAME": "Product 1",
            "PRICE": 19.99
          },
          "BUY_PRICE": 19.99,
          "QUANTITY": 2,
          "GIFT_WRAP": true,
          "MESSAGE": "Gift message"
        },
        {
          "ORDER_ITEM": {
            "_id": "item_id2",
            "ITEM_NAME": "Product 2",
            "PRICE": 29.99
          },
          "BUY_PRICE": 29.99,
          "QUANTITY": 1,
          "GIFT_WRAP": false,
          "MESSAGE": ""
        }
      ]
    }
  ]
}
```

### Image Upload Route

#### POST /images
Upload an image. Requires authentication.

Request body:
- Form-data with key "image" and file as value

Response:
```json
{
  "status": "ok",
  "message": "file uploaded successfully",
  "image": {
    "PROFILE_IMAGE": "image_key"
  }
}
```

#### GET /images/:key
Get an uploaded image.

Path parameters:
- `key`: Image key

Response: Image file

## GraphQL Endpoint

The GraphQL endpoint is available at `/graphql`. You can use tools like GraphiQL or GraphQL Playground to interact with the API.

### Queries

- `getAllItem`: Get all items
- `findItem`: Get item details by ID
- `findItemByName`: Search items by name
- `findItemList`: Get multiple items by ID list
- `checkShopName`: Check if a shop name is available
- `findShop`: Get shop details by ID
- `getUserById`: Get user details by ID
- `userLogin`: Log in a user
- `userSignup`: Sign up a new user
- `getOrders`: Get user's order history

### Mutations

- `addItem`: Add a new item
- `editItem`: Edit an existing item
- `addShop`: Create a new shop
- `uploadImage`: Upload an image
- `addShopImage`: Add an image to a shop
- `addOrder`: Create a new order
- `editUserProfile`: Update user profile

For detailed information on GraphQL queries and mutations, including input types and response formats, please refer to the GraphQL schema or use introspection in GraphiQL/GraphQL Playground.