# Printer API

Printer API is a application, for the purpose of user could be able to store your printer's inventory

## Installation

Use npm or yarn, both are node's package manager.

```bash
yarn
```
Or
```bash
npm install
```

## Usage

### Create a New Equipment <POST Method>

Send a POST HTTP Request to /equipment, using this json sample to create a new equipment
```
{
	"model": "teste",
	"category": "cartucho",
	"ppm": 2000,
	"wifi": true,
	"consume": 2000
}

```
This expected response is 
```
{
  "id": 24,
  "model": "teste",
  "category": "cartucho",
  "ppm": 2000,
  "wifi": true,
  "consume": 2000,
  "updatedAt": "2020-05-17T17:01:19.110Z",
  "createdAt": "2020-05-17T17:01:19.110Z"
}
```

### Get All Equipments <GET Method>

Send a GET HTTP Request to /equipment to receive a array of every printer that was stored at database like this:

```
[
 {
    "id": 10,
    "model": "teste",
    "category": "cartucho",
    "ppm": 2000,
    "wifi": true,
    "consume": 2000,
    "createdAt": "2020-05-17T15:04:58.782Z",
    "updatedAt": "2020-05-17T15:04:58.782Z"
  },
  {
    "id": 11,
    "model": "teste2",
    "category": "cartucho",
    "ppm": 2000,
    "wifi": true,
    "consume": 2000,
    "createdAt": "2020-05-17T15:05:14.200Z",
    "updatedAt": "2020-05-17T15:05:14.200Z"
  },
]
```

### Search An Equipments <GET Method>

Send a GET HTTP Request to /equipment/:id to receive  just an object, which contains all info that you want
```
{
  "id": 12,
  "model": "teste",
  "category": "cartucho",
  "ppm": 2000,
  "wifi": true,
  "consume": 2000,
  "createdAt": "2020-05-17T15:05:15.983Z",
  "updatedAt": "2020-05-17T15:05:15.983Z"
}
```

### Update an Equipment <PUT Method>

Send a PUT HTTP Request to /equipment, using this json sample to update an equipment
```
{
	"id": 12,
	"model": "impressora"
}


```
This expected response is 
```
{
  "message": "Equipment Successfully updated"
}
```

### Delete an Equipment <DELETE Method>

Send a DELETE HTTP Request to /equipment, using this json sample to update an equipment
```
{
	"id": 1
}


```
This expected response is 
```
{
  "message": "Equipment Successfully deleted"
}
```

## Tests

If you want to run tests, the application already has some unity and integration tests, that you could run using both npm or yarn
```
yarn test
```
Or
```
npm test
```


