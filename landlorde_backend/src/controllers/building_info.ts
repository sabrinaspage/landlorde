import { Pool } from "pg";
import pool from "../pool";

class BuildingInfoController {
  pool: Pool;

  constructor() {
    this.pool = pool;
  }
}

export default BuildingInfoController;
