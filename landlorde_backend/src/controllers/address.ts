import { Pool } from "pg";
import pool from "../pool";

class AddressController {
  pool: Pool;

  constructor() {
    this.pool = pool;
  }
}

export default AddressController;
