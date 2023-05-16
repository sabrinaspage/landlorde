import { Pool } from "pg";
import pool from "../pool";

class LogController {
  pool: Pool;

  constructor() {
    this.pool = pool;
  }
}

export default LogController;
