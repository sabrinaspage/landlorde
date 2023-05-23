import landlord from "@/controllers/landlord";
import { HttpMethods } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";
import { DatabaseError } from "pg";

export default async function landlordHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req;
  const { id } = query;

  if (!id || id instanceof Array) {
    res.status(400).json({ message: `One single id is required.` });
    return;
  }

  const exists = await landlord.exists(id);

  if (!exists) {
    res
      .status(400)
      .json({ message: `Landlord with id: ${id} does not exist.` });
    return;
  }

  if (req.method === HttpMethods.UPDATE) {
    const { body } = req;

    const result = await landlord.updateLandlordContactInfoById(id, body);

    if (result instanceof DatabaseError) {
      res.status(200).json({ message: result.message });
      return;
    }

    res.status(200).json({ message: result.rows[0] });
    return;
  }
}
