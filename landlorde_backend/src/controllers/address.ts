import { Pool } from "pg";
import pool from "../pool";

class AddressController {
  pool: Pool;

  constructor() {
    this.pool = pool;
  }

  async getAllAddresses() {
    const client = await pool.connect();
    try {
      const result = await client.query("SELECT * FROM address");
      return result.rows;
    } finally {
      client.release();
    }
  }

  async getAddressById(addressId: string) {
    const client = await pool.connect();
    try {
      const result = await client.query("SELECT * FROM address WHERE id = $1", [
        addressId,
      ]);
      return result.rows[0];
    } finally {
      client.release();
    }
  }
}

export default AddressController;
