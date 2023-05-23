import landlord from "@/controllers/landlord";
import { HttpMethods } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";
import { DatabaseError } from "pg";

export default async function landlordHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === HttpMethods.GET) {
    const result = await landlord.getAll();

    if (result instanceof DatabaseError) {
      res.status(200).json({ message: result.message });
      return;
    }

    res.status(200).json({ message: result.rows });
    return;
  }

  if (req.method === HttpMethods.POST) {
    const { body } = req;

    const result = await landlord.createLandlord(body);

    if (result instanceof DatabaseError) {
      res.status(200).json({ message: result.message });
      return;
    }

    res.status(200).json({ message: result.rows[0] });
    return;
  }
}
