# Transport Booking Server
A public bus transportation booking server, developed the back-end API with NodeJs and ExpressJs

## Table of Contents (Optional)

- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [Prerequisites](#prerequisites)
- [Settings](#settings)
- [License](#license)


## Usage


## Features
   Add to Base URL above

- Use the following Endpoints

    `POST /auth/signup` Create User Account

    `POST /auth/signin` Login A User

    `POST /trips` Create a trip (Needs admin priviledges)

    `GET /trips` Get all trips

    `POST /bookings` Book a seat on a trip

    `GET /bookings` See all of your bookings

    `DELETE /bookings/:bookingId` Delete A Booking

    `PATCH /trips/:tripId` Cancel A Trip (Needs admin priviledges)

    `GET /user/seed` Seed users table with users with admin rights

    `POST /admin/signup` An admin can add new admin (Needs admin priviledges)

    `PUT /user/:id/admin` An admin can give a registered user admin right (Needs admin priviledges)

    `PUT /bookings/:bookingId` Update Booking Seat Number

    `POST /buses` Add a bus (Needs admin priviledges)

    `GET /buses` Get all buses (Needs admin priviledges)

    `GET /trips/origin?origin="origin"` Filter trips by origin

    `GET /trips/destination?destination="destination"` Filter trips by destination


- A successful response will be

     ```javascript
      { status: 'success', data: {} }
     ```
     or

     ```javascript
      { status: 'success', data: [] }
     ```

  and an unsuccessful response will be

     ```javascript
     { status: 'error', error: '​relevant-error-message' }
     ```

## Contributing
    I would love to hear from anyone that will like to contribute

## Prerequisites
- NodeJs and Npm (https://nodejs.org/en/download/)

- PostgreSQL(https://www.postgresql.org/download/)

- Create a .env file at the project root `TransportApi/.env` see `env_example` file to know what to add to `.env` in your root folder.

- DBeaver: DBeaver is free and open source universal database tool for developers and database administrators.
  (https://dbeaver.io/download/), this is optional though, you can use any other GUI for postgreSQL.

## Settings
  If you want set up locally you can follow these steps, you can also use `postman`(https://www.getpostman.com/downloads/) to test. Clone the repository, open terminal in root and do the following on terminal

   ```shell
   $ npm install
   ```
   After Setting up the database, create database tables running the command below, its advisable to run the command more than once and make sure your database is updated with the tables:

   ```shell
   $ npm run create-dev-tables
   ```
   Start server by running:

   ```shell
   $ npm run start
   ```
   Seed Database tables with users(with admin right) by running the command below, its advisable to run it more than once:

   ```shell
   $ npm run seed-user-table
   ```
   or use 

   `GET /user/seed` Endpoint

   Test endpoints by running:
   ```shell
   $ npm run test
   ```
## License
   None for now.

developed with 💕 by Blessing Krofegha