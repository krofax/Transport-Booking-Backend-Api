import pool from '../db/dev/pool';
import {
    hashPassword,
  } from '../helpers/validations';
import {
  status,
} from '../helpers/status';
/**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
const seedUser = async (req, res) => {
  const seedUserQuery = `INSERT INTO
  users VALUES 
  ( default, 'samuel@gmail.com', 'Samuel', 'Adekunle', '${hashPassword('samade')}', true, NOW()),
  ( default, 'eze@gmail.com', 'Eze', 'Kelly', '${hashPassword('ezekelly')}', true, NOW()),
  ( default, 'damilola@gmail.com', 'Damilola', 'Adedeji', '${hashPassword('adedeji2')}', true, NOW()),
  ( default, 'temilola@gmail.com', 'Temilola', 'Adedeji', '${hashPassword('temitee1')}', default, NOW()),
  ( default, 'kingsley@gmail.com', 'Kingsley', 'Clement', '${hashPassword('clementking')}', default, NOW())`;
  
  try {
    const { rows } = await pool.query(seedUserQuery);
    const dbResponse = rows;
    if (!dbResponse) {
      return res.status(status.bad).send('Seeding Was not Successful');
    }
    return res.status(status.created).send('Seeding Users table Was Successful');
  } catch (error) {
    return res.status(status.error).send('An Error occured try later');
  }
};

export default seedUser;
