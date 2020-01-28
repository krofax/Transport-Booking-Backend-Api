import pool from './pool';

pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * Create User Table
 */
const createUserTable = () => {
  const userCreateQuery = `CREATE TABLE IF NOT EXISTS users
  (id SERIAL PRIMARY KEY, 
  email VARCHAR(100) UNIQUE NOT NULL, 
  first_name VARCHAR(100), 
  last_name VARCHAR(100), 
  password VARCHAR(100) NOT NULL,
  is_admin BOOL DEFAULT(false),
  created_on DATE NOT NULL)`;

  pool.query(userCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Create Buses Table
 */
const createBusTable = () => {
  const busCreateQuery = `CREATE TABLE IF NOT EXISTS bus
    (id SERIAL PRIMARY KEY,
    number_plate VARCHAR(100) NOT NULL,
    manufacturer VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year VARCHAR(10) NOT NULL,
    capacity integer NOT NULL,
    created_on DATE NOT NULL)`;

  pool.query(busCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Create Trip Table
 */
const createTripTable = () => {
  const tripCreateQuery = `CREATE TABLE IF NOT EXISTS trip
    (id SERIAL PRIMARY KEY, 
    bus_id INTEGER REFERENCES bus(id) ON DELETE CASCADE,
    origin VARCHAR(300) NOT NULL, 
    destination VARCHAR(300) NOT NULL,
    trip_date DATE NOT NULL,
    fare float NOT NULL,
    status float DEFAULT(1.00),
    created_on DATE NOT NULL)`;

  pool.query(tripCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Create Booking Table
 */
const createBookingTable = () => {
  const bookingCreateQuery = `CREATE TABLE IF NOT EXISTS booking(id SERIAL, 
    trip_id INTEGER REFERENCES trip(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    bus_id INTEGER REFERENCES bus(id) ON DELETE CASCADE,
    trip_date DATE, 
    seat_number INTEGER UNIQUE,      
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,      
    created_on DATE NOT NULL,
    PRIMARY KEY (id, trip_id, user_id))`;
  pool.query(bookingCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop User Table
 */
const dropUserTable = () => {
  const usersDropQuery = 'DROP TABLE IF EXISTS users';
  pool.query(usersDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


/**
 * Drop Bus Table
 */
const dropBusTable = () => {
  const busDropQuery = 'DROP TABLE IF EXISTS bus';
  pool.query(busDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop Trip Table
 */
const dropTripTable = () => {
  const tripDropQuery = 'DROP TABLE IF EXISTS trip';
  pool.query(tripDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop Bus Table
 */
const dropBookingTable = () => {
  const bookingDropQuery = 'DROP TABLE IF EXISTS booking';
  pool.query(bookingDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


/**
 * Create All Tables
 */
const createAllTables = () => {
  createUserTable();
  createBusTable();
  createTripTable();
  createBookingTable();
};


/**
 * Drop All Tables
 */
const dropAllTables = () => {
  dropUserTable();
  dropBusTable();
  dropTripTable();
  dropBookingTable();
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});


export {
  createAllTables,
  dropAllTables,
};

require('make-runnable');
