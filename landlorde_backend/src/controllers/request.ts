import { Pool } from "pg";
import pool from "../pool";

class RequestController {
  pool: Pool;

  constructor() {
    this.pool = pool;
  }
}

export default RequestController;
