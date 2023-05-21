import landlord from "@/controllers/landlord";
import { NextApiRequest, NextApiResponse } from "next";

export default async function landlordHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req;
  const { id } = query;

  if (id instanceof Array) {
    res.status(400).json({ message: `Only one id allowed.` });
    return;
  }

  if (!id) {
    res.status(400).json({ message: `id must be defined.` });
    return;
  }

  const result = await landlord.getLandlordById(id);

  if (!result) {
    res.status(400).json({ message: `Landlord with id: ${id} not found.` });
    return;
  }

  res.status(200).json({ message: result });
}
