# Game Store API Documentation
The Game Store API is designed to support and facilitate the functionality of an online video game ecommerce platform. This API provides the necessary endpoints to retrieve game information, view detailed game descriptions, sign in users, and place orders. It serves as the backend interface, responding to client requests and interacting with the underlying database to fetch and manipulate data.
Key operations facilitated by this API include:

* Browsing the available video games with basic information like game name, short name, rating, and price.
* Fetching detailed information of a specific game such as the developer, description, platforms, genre, release date, and price.
* Authenticating users by verifying their username and password, essential for actions like placing orders.
* Placing orders by providing a user ID and a list of games with their quantities.

## All Games
**Request Format:** /allgames

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** This endpoint retrieve the available video games on the site. It should return a list of the games with relevant details such as game name, short name, rate, price, etc.

**Example Request:** /allgames

**Example Response:**

```json
[
  {
    "name": "FIFA 23",
    "shortName": "fifa23",
    "rate": 5,
    "price": 27.99
  },
  {
    "name": "Final Fantasy",
    "shortName": "finalfantasy",
    "rate": 4.5,
    "price": 69.99
  },
  {
    "name": "Call of Duty",
    "shortName": "callofduty",
    "rate": 4,
    "price": 59.99
  },
  {
    "name": "Resident Evil 4",
    "shortName": "residentevil4",
    "rate": 5,
    "price": 54.99
  },
  {
    "name": "God of War",
    "shortName": "godofwar",
    "rate": 4.5,
    "price": 54.99
  }
]
```

**Error Handling:**
* Possible 400 errors (all plain text):
If passed in an invalid endpoint, returns an error with the message: Given endpoint is not correct, try again.

* Possible 500 errors (all plain text):
If something else goes wrong on the server, returns an error with the message: Uh oh. Something went wrong. Please try again later.

## Game Detail
**Request Format:** /detail/:gameShortName

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** This endpoint would retrieve the details of a specific game, such as the gameID, developer, description, price, and any associated images. The short name of the game would be included in the URL as a path parameter.

**Example Request:** /detail/fifa23

**Example Response:**

```json
{
  "name": "FIFA 23",
  "shortName": "fifa23",
  "gameID": 123,
  "rate": 5,
  "price": 27.99,
  "description": "The latest installment of the popular FIFA series...",
  "developer": "EA Sports",
  "platform": ["PS5", "Xbox Series X", "PC"],
  "genre": "Sports",
  "releaseDate": "2023-09-23"
}
```

**Error Handling:**
* Possible 400 errors (all plain text):
If passed wrong short name of the game, returns an error with the message: Can't find this game, try again.

* Possible 500 errors (all plain text):
If something else goes wrong on the server, returns an error with the message: Uh oh. Something went wrong. Please try again later.

## User SignIn
**Request Format:** /signin endpoint with POST parameters of username and password

**Request Type:** POST

**Returned Data Format**: JSON

**Description:** Given a valid user name and a password to send, the server will return with a
json response if the username and password match an entry in the database.

**Example Request:** /signin with Form Data: `username: testAdmin` and `password: hh112233`

**Example Response:**

```json
{
  "token": "dabibfiabkzbc21budaibfai2",
  "user": {
    "uID": 2134312,
    "username": "testAdmin",
  }
}
```

**Error Handling:**
* Possible 400 (invalid request) errors (all plain text):
  - If passed in an invalid username, returns an error with the message: Username or Password is not valid.
  - If passed in an incorrect password, returns an error with the message: Username or Password is not valid.

## Order Placement
**Request Format:** /order endpoint with POST parameters of userId, cart (array of productIds and quantities).

**Request Type:** POST

**Returned Data Format**: JSON

**Description:** This endpoint would be used to place a new order. The details of the order, including the userId and the games being ordered, would be sent in the request body. It should return the information, such as price, date of the order.

**Example Request:** /order with Form Data: `uID: 34325`, `gameId: 123` and `quantity: 1`

**Example Response:**

```json
{
    "orderId": 001,
    "uID": 34325,
    "date": "2023-05-17",
    "items": [
        {
            "gameId": 123,
            "quantity": 1,
            "price": 59.99
        }
    ],
    "total": 59.99
}
```

**Error Handling:**
* Possible 400 (invalid request) errors (all plain text):
  - If passed in a undefined userId, returns an error with the message: Please sign in first.
  - If passed in invalid gameId, returns an error with the message: Game does not exist.