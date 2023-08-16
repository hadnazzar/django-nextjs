import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Missing fields" });
    }

    return res.status(200).json({ id: "1", name, email, role: "admin" });
  } catch (err) {
    const error = err as Error;
    return res.status(500).json({ error: error.message });
  }
}
