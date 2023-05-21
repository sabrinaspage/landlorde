import landlord from "@/controllers/landlord";
import { NextApiRequest, NextApiResponse } from "next";
import { DatabaseError } from "pg";

export default async function landlordHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { query } = req;
    const { id } = query;

    if (!id) return;

    if (id instanceof Array) {
      res.status(400).json({ message: `Only one id allowed.` });
      return;
    }

    const result = await landlord.getLandlordById(id);

    if (result instanceof DatabaseError) {
      res.status(200).json({ message: result.message });
      return;
    }

    if (result.rowCount === 0) {
      res
        .status(200)
        .json({ message: `Landlord with id: ${id} does not exist.` });
      return;
    }

    res.status(200).json({ message: result.rows[0] });
    return;
  }

  if (req.method === "DELETE") {
    const { query } = req;
    const { id } = query;

    if (!id) return;

    if (id instanceof Array) {
      res.status(400).json({ message: `Only one id allowed.` });
      return;
    }

    const result = await landlord.deleteLandlord(id);

    if (result instanceof DatabaseError) {
      res.status(200).json({ message: result.message });
      return;
    }

    if (result.rowCount === 0) {
      res
        .status(200)
        .json({ message: `Landlord with id: ${id} does not exist.` });
      return;
    }

    res.status(200).json({ message: `Successfully deleted ${id}.` });
    return;
  }
}
