import { Pool } from 'pg';
import env from '../../../env';

const databaseConfig = { connectionString: env.test_database_url };
const pool = new Pool(databaseConfig);

export default pool;
