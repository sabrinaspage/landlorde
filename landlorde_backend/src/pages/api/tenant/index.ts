import tenant from "@/controllers/tenant";
import { HttpMethods } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function tenantHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === HttpMethods.GET) {
    const result = await tenant.getAll();

    // if (result instanceof DatabaseError) {
    //   res.status(200).json({ message: result.message });
    //   return;
    // }

    res.status(200).json({ message: result.rows });
    return;
  }

  if (req.method === HttpMethods.POST) {
    const { body } = req;

    const result = await tenant.createTenant(body);

    // if (result instanceof DatabaseError) {
    //   res.status(200).json({ message: result.message });
    //   return;
    // }

    res.status(200).json({ message: result.rows[0] });
    return;
  }
}
