import type { NextApiRequest, NextApiResponse } from "next";
import landlord from "@/controllers/landlord";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: any }>
) {
  const result = await landlord.createLandlord({
    phone_number: "123-456-7890",
    email: "sab@gmail.com",
    fax_number: "123-456-7890",
    landlord_name: "my name",
  });
  res.status(200).json({ message: result });
}
