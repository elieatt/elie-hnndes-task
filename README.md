
# API Documentation

This repository contains a RESTful API built with Node.js, Express.js, and Sequelize ORM. It provides endpoints for managing notes and author authentication.

## Getting Started

To get started with the API, follow the steps below:

### Prerequisites

- Node.js and npm installed on your machine
- PostgreSQL or any other supported database system

### Installation

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install the dependencies by running the following command:
   `````shell
   npm install
   ```
4. Set up the database configuration and JWT secret in the `config/config.json` file according to your database system and credentials.

### Starting the Server

1. Start the server by running the following command:
   ````shell
   npm start
   ```
2. The API will be accessible at `http://localhost:3000`.

## API Endpoints

### Notes

- `POST /notes`: Create a new note.
- `GET /notes`: Retrieve all notes.
- `GET /notes/:id`: Retrieve a specific note by ID.
- `DELETE /notes/:id`: Delete a specific note by ID.

### Author

- `POST /authors/signup`: Create a new author account.
- `POST /authors/login`: Authenticate an author and generate JWT tokens.

## Authentication

To access notes endpoint, you need to include an `Authorization` header in the request with a valid JWT token. The token can be obtained by authenticating as an author using the `/authors/login` endpoint.

Example:
```
Authorization: Bearer {token}
```

**Note:** The generated JWT tokens are non-expiring, and authors can obtain multiple tokens for accessing the API.

## Usage Example

### Creating a New Note

To create a new note, send a POST request to the `/notes` endpoint with the following JSON payload:

```json
{
  "title": "Note title",
  "content": "This is the content of the title."
}
```

### Retrieving All Notes

To retrieve all notes, send a GET request to the `/notes` endpoint.

### Retrieving a Specific Note

To retrieve a specific note by ID, send a GET request to the `/notes/:id` endpoint, replacing `:id` with the ID of the note you want to retrieve.

### Deleting a Note

To delete a specific note by ID, send a DELETE request to the `/notes/:id` endpoint, replacing `:id` with the ID of the note you want to delete.

### Creating a New Author Account

To create a new author account, send a POST request to the `/authors/signup` endpoint with the following JSON payload:

```json
{
  "email": "test@tester.com",
  "password": "password",
  "username": "Test Tester",
}
```

### Authenticating an Author

To authenticate an author and generate a JWT token, send a POST request to the `/authors/login` endpoint with the following JSON payload:

```json
{
  "email": "test@tester.com",
  "password": "password"
}
```

The response will include a JWT token that can be used for accessing the notes endpoint.

## Error Handling

In case of errors, the API will return appropriate HTTP status codes and error messages in the response body.