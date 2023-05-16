import { Pool } from "pg";
import pool from "../pool";

class TenantController {
  pool: Pool;

  constructor() {
    this.pool = pool;
  }
}

export default TenantController;
