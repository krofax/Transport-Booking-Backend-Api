import pool from '../db/dev/pool';

pool.on('connect', () => {
  console.log('connected to the db');
});


/**
 * SEED Admin User
 */
const seed = () => {
  const seedUserQuery = `INSERT INTO
    users VALUES 
    ( default, 'samuel@gmail.com', 'Samuel', 'Adekunle', 'samade', true, NOW()),
    ( default, 'eze@gmail.com', 'Eze', 'Kelly', 'ezekelly', true, NOW()),
    ( default, 'damilola@gmail.com', 'Damilola', 'Adedeji', 'adedeji2', true, NOW()),
    ( default, 'temilolu@gmail.com', 'Temilola', 'Adedeji', 'temitee1', default, NOW()),
    ( default, 'kingsley@gmail.com', 'Kingsley', 'Clement', 'clementking', default, NOW())`;

  pool.query(seedUserQuery)
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
 * Seed users
 */
const seedUser = () => {
  seed();
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

export { seedUser };

require('make-runnable');
