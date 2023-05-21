import landlord from "@/controllers/landlord";
import { NextApiRequest, NextApiResponse } from "next";
import { DatabaseError } from "pg";

export default async function landlordsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const result = await landlord.getAllLandlords();

    if (result instanceof DatabaseError) {
      res.status(200).json({ message: result.message });
      return;
    }

    res.status(200).json({ message: result.rows });
    return;
  }
}
