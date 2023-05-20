import { Pool } from "pg";
import pool from "../pool";

class ControllerApi {
  pool: Pool;

  constructor() {
    this.pool = pool;
  }

  async runQuery(query: string, params: any[] | undefined = undefined) {
    const client = await this.pool.connect();
    try {
      const result = await client.query(query, params);
      return result.rows;
    } catch (e) {
      console.error(e);
    } finally {
      client.release();
    }
  }
}

export default ControllerApi;
