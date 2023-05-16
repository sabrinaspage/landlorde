import type { NextApiRequest, NextApiResponse } from "next";
import pool from "../pool";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  const client = await pool.connect();
  console.log(client);
  try {
    const result = await client.query("SELECT * FROM landlord");
    // res.status(200).json({ result });

    console.log(result.rows);
    console.log("hello");
  } finally {
    client.release();
  }
}
