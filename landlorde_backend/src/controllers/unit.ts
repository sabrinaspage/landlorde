import { Pool } from "pg";
import pool from "../pool";

class UnitController {
  pool: Pool;

  constructor() {
    this.pool = pool;
  }
}

export default UnitController;
