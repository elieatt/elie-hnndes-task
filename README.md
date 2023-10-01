# API Documentation
This is a demo rest API allows you to manage personal notes 
*No authentication or authorization were implemented ,(I adhered to the text of the task literally)*

## API Endpoints

### Notes

- `GET /notes`: Retrieve all notes.
- `GET /notes/:id`: Retrieve a specific note by ID.
- `POST /notes`: Create a new note.
- `DELETE /notes/:id`: Delete a note by ID

## Request and Response Examples

*suppose we have insterted an author into the db with id*

### Create a Note

**Request:**
POST /notes
Content-Type: application/json

{
"title": "Sample Note",
"content": "This is a sample note.",
"authorId": 1
}
**Response:**
HTTP/ 201 Created
Content-Type: application/json

{
"id": 1,
"title": "Sample Note",
"content": "This is a sample note.",
"authorId": 1,
"createdAt": "2023-10-01T12:00:00Z",
"updatedAt": "2023-10-01T12:00:00Z",
"Author": {
                "id": 1,
                "name": "Elie",
                "createdAt": "2023-10-01T11:09:41.248Z",
                "updatedAt": "2023-10-01T11:09:41.248Z"
            }
}

### Get All Notes

**Request:**
GET /notes

**Response:**

HTTP 200 OK
Content-Type: application/json

[
{
"id": 1,
"title": "Sample Note",
"content": "This is a sample note.",
"authorId": 1,
"createdAt": "2023-10-01T12:00:00Z",
"updatedAt": "2023-10-01T12:00:00Z",
"Author": {
                "id": 1,
                "name": "Elie",
                "createdAt": "2023-10-01T11:09:41.248Z",
                "updatedAt": "2023-10-01T11:09:41.248Z"
            }
},
// Other notes...
]

## Error Handling

In case of errors, the API will return appropriate HTTP status codes and error messages in the response body.