# API Documentation

## Overview

This document provides information on the available HTTP endpoints for managing FHIR resources, including the status codes returned by each endpoint. 

## Endpoints

### 1. GET /:resource/:id?

Retrieve a FHIR resource or a list of resources.

- **Status Codes:**
  - `200 OK` - Successfully retrieved the resource(s).
  - `401 Unauthorized` - User is not logged in or does not have permission to access the resource.
  - `500 Internal Server Error` - An error occurred while processing the request.

### 2. GET /vRead/:resource/:id/:version

Retrieve a specific version of a FHIR resource.

- **Status Codes:**
  - `200 OK` - Successfully retrieved the resource.
  - `401 Unauthorized` - User is not logged in or does not have permission to access the resource.
  - `500 Internal Server Error` - An error occurred while processing the request.

### 3. POST /:resource

Create a new FHIR resource.

- **Status Codes:**
  - `201 Created` - Successfully created the resource.
  - `401 Unauthorized` - User is not logged in or does not have permission to create the resource.
  - `500 Internal Server Error` - An error occurred while processing the request.

### 4. PATCH /CodeSystem/:id/:code

Update a specific code in a CodeSystem resource.

- **Status Codes:**
  - `200 OK` - Successfully updated the code.
  - `401 Unauthorized` - User is not logged in or does not have permission to update the resource.
  - `500 Internal Server Error` - An error occurred while processing the request.

### 5. PUT /:resource/:id

Update an existing FHIR resource.

- **Status Codes:**
  - `200 OK` - Successfully updated the resource.
  - `401 Unauthorized` - User is not logged in or does not have permission to update the resource.
  - `500 Internal Server Error` - An error occurred while processing the request.

### 6. GET /ValueSet/:id/\$expand

Expand a ValueSet resource.

- **Status Codes:**
  - `200 OK` - Successfully expanded the ValueSet.
  - `401 Unauthorized` - User is not logged in or does not have permission to expand the ValueSet.
  - `500 Internal Server Error` - An error occurred while processing the request.

### 7. GET /CodeSystem/\$lookup

Perform a lookup on a CodeSystem.

- **Status Codes:**
  - `200 OK` - Successfully performed the lookup.
  - `401 Unauthorized` - User is not logged in or does not have permission to perform the lookup.
  - `500 Internal Server Error` - An error occurred while processing the request.

### 8. GET /DocumentReference/:id/\$html

Retrieve a DocumentReference resource in HTML format.

- **Status Codes:**
  - `200 OK` - Successfully retrieved the DocumentReference in HTML format.
  - `401 Unauthorized` - User is not logged in or does not have permission to access the DocumentReference.
  - `500 Internal Server Error` - An error occurred while processing the request.

### 9. GET /\$short-name

Retrieve a short name for a resource.

- **Status Codes:**
  - `200 OK` - Successfully retrieved the short name.
  - `401 Unauthorized` - User is not logged in or does not have permission to retrieve the short name.
  - `500 Internal Server Error` - An error occurred while processing the request.

### 10. DELETE /:resource/:id

Delete a FHIR resource.

- **Status Codes:**
  - `200 OK` - Successfully deleted the resource.
  - `401 Unauthorized` - User is not logged in or does not have permission to delete the resource.
  - `500 Internal Server Error` - An error occurred while processing the request.

## Common Error Handling

For all endpoints, the following error handling mechanisms are in place:

- **401 Unauthorized:** Returned if the user is not logged in or does not have the necessary permissions to access the resource.
- **500 Internal Server Error:** Returned if there is an error processing the request. Detailed diagnostics information is included in the response.

## Example Responses

### Success Response
```json
{
  "resourceType": "ResourceType",
  "id": "123",
  "data": "Resource data"
}
```
### Not LogedIn Response
```json
{
    "resourceType": "OperationOutcome",
    "issue": [
      {
        "severity": "error",
        "code": "forbidden",
        "diagnostics": "Not Logged In"
      }
    ]
  }
```

### Unauthorized Response
```json
{
    "resourceType": "OperationOutcome",
    "issue": [
      {
        "severity": "error",
        "code": "forbidden",
        "diagnostics": "Access Denied"
      }
    ]
  }
```

### Error Response
```json
{
    "resourceType": "OperationOutcome",
    "issue": [
      {
        "severity": "error",
        "code": "exception",
        "diagnostics": ""
      }
    ]
  }
```

## Notes

- Ensure that the user is authenticated before accessing these endpoints.
- Permissions must be verified based on the resource type and operation being performed.
- Proper error handling is implemented to provide meaningful error messages and diagnostics information.
