import { Pool } from "pg";
import pool from "../pool";
import { NextApiRequest, NextApiResponse } from "next";

class LandlordController {
  pool: Pool;

  constructor() {
    this.pool = pool;
  }

  async getAllLandlords() {
    const client = await pool.connect();
    try {
      const result = await client.query("SELECT * FROM landlord");
      return result.rows;
    } finally {
      client.release();
    }
  }

  async getLandlordById(landlordId: string) {
    const client = await pool.connect();
    try {
      const result = await client.query(
        "SELECT * FROM landlord WHERE id = $1",
        [landlordId]
      );
      return result.rows;
    } finally {
      client.release();
    }
  }

  async createLandlord(landlordData: any) {
    const client = await this.pool.connect();

    try {
      const { name, address, phone } = landlordData;
      const result = await client.query(
        "INSERT INTO landlords (name, address, phone) VALUES ($1, $2, $3) RETURNING *",
        [name, address, phone]
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async updateLandlordById(landlordName: string | null, landlordId: string) {
    const client = await pool.connect();
    try {
      const result = await client.query(
        `UPDATE landlord SET
            name = COALESCE($2, name)
            WHERE id = $1
          RETURNING *;`,
        [landlordId, landlordName]
      );
      return result.rows;
    } finally {
      client.release();
    }
  }

  async deleteLandlord(landlordId: string) {
    const client = await this.pool.connect();

    try {
      const result = await client.query("DELETE FROM landlord WHERE id = $1", [
        landlordId,
      ]);
      return result.rowCount;
    } finally {
      client.release();
    }
  }
}

export default new LandlordController();
