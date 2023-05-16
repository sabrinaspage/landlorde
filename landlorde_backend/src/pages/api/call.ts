import type { NextApiRequest, NextApiResponse } from "next";
import landlord from "@/controllers/landlord";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: any }>
) {
  const result = await landlord.deleteLandlord(
    "400394c0-2584-47cd-8962-cb0ae71451d8"
  );
  res.status(200).json({ message: result });
}
