import { DatabaseError, Pool, QueryResult } from "pg";
import pool from "../pool";

class ControllerApi {
  pool: Pool;

  constructor() {
    this.pool = pool;
  }

  async runQuery(
    query: string,
    params: any[] | undefined = undefined
  ): Promise<QueryResult | DatabaseError> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(query, params);
      return result;
    } catch (e) {
      if (e instanceof DatabaseError) {
        return e;
      }
      throw e;
    } finally {
      client.release();
    }
  }
}

export default ControllerApi;
