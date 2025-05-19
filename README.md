# WeatherLetter
API service for weather update subscriptions depends
on the chosen city.

## Installation

```
git clone https://github.com/serhiibezuhlyi/weatherletter
```
```
cd weatherletter
```
```
docker compose up
```

## Api

Endpoints:

- `GET /api/weather?city={city}` - Get current weather for a given city with `Temperature`, `Humidity` and `Weather description`
- `POST /api/subscribe` - Subscribe a given `email` to weather updates for a given `city` with a given frequency (`daily` or `hourly`)
- `GET /api/confirm/{token}` - Confirm email subscription (send a link to this endpoint on the confirmation email)
- `GET /api/unsubscribe/{token}` - Unsubscribe from weather updates (send a link to this endpoint in each weather update)

> **Note**: `swagger.yaml` file contains API documentation. You can watch it using [Swagger Editor](https://editor.swagger.io/).


## Logic
The service is split into two parts: back-end and database.
The database includes two tables: 
- forecast
  - id: int
  - city: text
  - temperature: int
  - humidity: int
  - description: text
####
- subscription
  - id: int
  - email: text
  - city: text
  - frequency: text
  - is_verified: boolean
###
The back-end uses this database to store subscriber data
and retrieve forecast data. Additionally, the back-end uses an initial
migration to create tables and insert these rows into the forecast table:
```
|  city  |  temperature  |  humidity  |  description  |
|--------|---------------|------------|---------------|
| Kyiv   |       20      |     60     |     Sunny     |
| Lviv   |       18      |     70     |    Cloudy     |
| Odesa  |       25      |     50     |   Clear sky   |
```
The initial subscribers table is empty.
###
To subscribe, the user must complete a form. After that,
a confirmation email will be sent to their email address.
The confirmation email contains a link with a token. The user
must follow this link to verify their subscription. This token is
also used for unsubscribing.
###
The token is generated using AES-256-GCM encryption from the email.
It allows decrypting the token and verifying the corresponding email
in the database. If the user does not verify their email before 12:00 PM,
their data will be removed from the database.
###
Emails with the current forecast are sent every hour if the user chooses
the "hourly" frequency, or at 12:00 AM every day if the "daily" option is selected.
###
This service does not implement email sending.
Also, it does not implement the feature for updating forecast data in the database.

## Stack
- Nest.js
- TypeScript
- Docker
- TypeOrm/Postgresql
