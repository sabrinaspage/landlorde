import { Pool } from "pg";
import pool from "../pool";

class UnitController {
  pool: Pool;

  constructor() {
    this.pool = pool;
  }

  async getAllUnits() {
    const client = await pool.connect();
    try {
      const result = await client.query("SELECT * FROM unit");
      return result.rows;
    } finally {
      client.release();
    }
  }

  async getUnitById(unitId: string) {
    const client = await pool.connect();
    try {
      const result = await client.query("SELECT * FROM unit WHERE id = $1", [
        unitId,
      ]);
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async createUnit(unitData: any) {
    const client = await this.pool.connect();

    try {
      const { unit_number } = unitData;
      const result = await client.query(
        `
          INSERT INTO unit (unitnumber)
          SELECT $1, $2
          FROM inserted_contactinfo
          RETURNING *;
        `,
        [unit_number]
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async updateUnitById(unitName: string | null, unitId: string) {
    const client = await pool.connect();
    try {
      const result = await client.query(
        `
        UPDATE unit SET
          unitnumber = COALESCE($2, unitnumber)
          WHERE id = $1
        RETURNING *;
        `,
        [unitId, unitName]
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async deleteUnit(unitId: string) {
    const client = await this.pool.connect();

    try {
      const result = await client.query("DELETE FROM unit WHERE id = $1", [
        unitId,
      ]);
      return result.rowCount;
    } finally {
      client.release();
    }
  }
}

export default UnitController;
