import { DatabaseError, Pool, QueryResult } from "pg";
import pool from "../pool";

class ControllerApi {
  MODEL_NAME = "";
  pool: Pool;

  constructor() {
    this.pool = pool;
  }

  async getAll() {
    return this.runQuery(`SELECT * FROM ${this.MODEL_NAME}`);
  }

  async getById(landlordId: string) {
    return this.runQuery(`SELECT * FROM ${this.MODEL_NAME} WHERE id = $1`, [
      landlordId,
    ]);
  }

  async exists(landlordId: string) {
    return this.runQuery(
      `SELECT EXISTS ( SELECT * FROM ${this.MODEL_NAME} WHERE id = $1)`,
      [landlordId]
    );
  }

  async delete(landlordId: string) {
    return this.runQuery(`DELETE FROM ${this.MODEL_NAME} WHERE id = $1`, [
      landlordId,
    ]);
  }

  async runQuery(
    query: string,
    params: any[] | undefined = undefined
  ): Promise<QueryResult> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(query, params);
      if (result instanceof DatabaseError) {
        throw result;
      }
      return result;
    } catch (e) {
      console.error(e);
      throw e;
    } finally {
      client.release();
    }
  }
}

export default ControllerApi;
