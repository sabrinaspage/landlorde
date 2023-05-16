import { Pool } from "pg";

const pool = new Pool({
  connectionString: "postgresql://postgres:1337@localhost:8080/landlorde",
  ssl: false,
});

export default pool;
