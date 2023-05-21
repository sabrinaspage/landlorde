import type { NextApiRequest, NextApiResponse } from "next";
import landlord from "@/controllers/landlord";
import tenant from "@/controllers/tenant";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: any }>
) {
  const result = await tenant.createTenant({
    phone_number: "123-456-7890",
    email: "sab@gmail.com",
    fax_number: "123-456-7890",
    tenant_name: "my name",
  });
  res.status(200).json({ message: result });
}
