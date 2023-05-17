import { Pool } from "pg";
import pool from "../pool";

class TenantController {
  pool: Pool;

  constructor() {
    this.pool = pool;
  }

  async getAllTenants() {
    const client = await pool.connect();
    try {
      const result = await client.query("SELECT * FROM tenant");
      return result.rows;
    } finally {
      client.release();
    }
  }

  async getTenantById(tenantId: string) {
    const client = await pool.connect();
    try {
      const result = await client.query("SELECT * FROM tenant WHERE id = $1", [
        tenantId,
      ]);
      return result.rows;
    } finally {
      client.release();
    }
  }

  async createTenant(tenantData: any) {
    const client = await this.pool.connect();

    try {
      const { phone_number, email, fax_number, tenant_name } = tenantData;
      const result = await client.query(
        `
        WITH inserted_contactinfo AS (
          INSERT INTO contactinfo (phonenumber, email, faxnumber) 
          VALUES ($1, $2, $3)
          RETURNING id
        )
        INSERT INTO tenant (name, contact_info_id)
        SELECT $4, id
        FROM inserted_contactinfo
        RETURNING *;
        `,
        [phone_number, email, fax_number, tenant_name]
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async updateTenantById(tenantName: string | null, tenantId: string) {
    const client = await pool.connect();
    try {
      const result = await client.query(
        `
        UPDATE tenant SET
          name = COALESCE($2, name)
          WHERE id = $1
        RETURNING *;
        `,
        [tenantId, tenantName]
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async deleteTenant(tenantId: string) {
    const client = await this.pool.connect();

    try {
      const result = await client.query("DELETE FROM tenant WHERE id = $1", [
        tenantId,
      ]);
      return result.rowCount;
    } finally {
      client.release();
    }
  }
}

export default new TenantController();
