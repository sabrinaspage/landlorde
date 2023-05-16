import { Pool } from "pg";
import pool from "../pool";

class BuildingController {
  pool: Pool;

  constructor() {
    this.pool = pool;
  }
}

export default BuildingController;
